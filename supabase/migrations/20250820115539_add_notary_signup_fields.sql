-- Add missing columns to notaries table for signup process
ALTER TABLE notaries 
ADD COLUMN IF NOT EXISTS commission_number text,
ADD COLUMN IF NOT EXISTS commission_expiry_date date,
ADD COLUMN IF NOT EXISTS notary_type text CHECK (notary_type IN ('traditional', 'remote', 'both')),
ADD COLUMN IF NOT EXISTS notary_county text,
ADD COLUMN IF NOT EXISTS signature_image_url text,
ADD COLUMN IF NOT EXISTS seal_image_url text,
ADD COLUMN IF NOT EXISTS business_name text,
ADD COLUMN IF NOT EXISTS business_address text,
ADD COLUMN IF NOT EXISTS years_experience integer,
ADD COLUMN IF NOT EXISTS specializations text[],
ADD COLUMN IF NOT EXISTS hourly_rate numeric(10,2),
ADD COLUMN IF NOT EXISTS travel_radius integer,
ADD COLUMN IF NOT EXISTS availability_schedule jsonb,
ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Create notary_documents table for credential storage
CREATE TABLE IF NOT EXISTS notary_documents (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    notary_id uuid REFERENCES notaries(id) ON DELETE CASCADE,
    document_type text NOT NULL CHECK (document_type IN ('commission_certificate', 'bond_certificate', 'insurance_certificate', 'id_document', 'other')),
    document_name text NOT NULL,
    document_url text NOT NULL,
    file_size integer,
    mime_type text,
    upload_date timestamp with time zone DEFAULT now(),
    verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    verification_notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notaries_commission_number ON notaries(commission_number);
CREATE INDEX IF NOT EXISTS idx_notaries_notary_county ON notaries(notary_county);
CREATE INDEX IF NOT EXISTS idx_notaries_verification_status ON notaries(verification_status);
CREATE INDEX IF NOT EXISTS idx_notaries_profile_completed ON notaries(profile_completed);
CREATE INDEX IF NOT EXISTS idx_notary_documents_notary_id ON notary_documents(notary_id);
CREATE INDEX IF NOT EXISTS idx_notary_documents_type ON notary_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_notary_documents_verification_status ON notary_documents(verification_status);

-- Add updated_at trigger for notaries table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_notaries_updated_at 
    BEFORE UPDATE ON notaries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notary_documents_updated_at 
    BEFORE UPDATE ON notary_documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies for notary_documents table
ALTER TABLE notary_documents ENABLE ROW LEVEL SECURITY;

-- Policy: Notaries can only see their own documents
CREATE POLICY "Notaries can view own documents" ON notary_documents
    FOR SELECT USING (
        auth.uid() IN (
            SELECT profile_id FROM notaries WHERE id = notary_documents.notary_id
        )
    );

-- Policy: Notaries can insert their own documents
CREATE POLICY "Notaries can insert own documents" ON notary_documents
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT profile_id FROM notaries WHERE id = notary_documents.notary_id
        )
    );

-- Policy: Notaries can update their own documents
CREATE POLICY "Notaries can update own documents" ON notary_documents
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT profile_id FROM notaries WHERE id = notary_documents.notary_id
        )
    );

-- Policy: Notaries can delete their own documents
CREATE POLICY "Notaries can delete own documents" ON notary_documents
    FOR DELETE USING (
        auth.uid() IN (
            SELECT profile_id FROM notaries WHERE id = notary_documents.notary_id
        )
    );
