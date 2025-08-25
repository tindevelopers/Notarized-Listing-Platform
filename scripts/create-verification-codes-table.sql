-- Create verification_codes table for storing verification codes and tokens
CREATE TABLE IF NOT EXISTS public.verification_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  code text NOT NULL,
  type text NOT NULL CHECK (type IN ('email_verification', 'password_reset')),
  expires_at timestamp with time zone NOT NULL,
  used boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON public.verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON public.verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_type ON public.verification_codes(type);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON public.verification_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_verification_codes_email_type ON public.verification_codes(email, type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_verification_codes_updated_at 
  BEFORE UPDATE ON public.verification_codes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for verification_codes table
-- Only allow service role to manage verification codes
CREATE POLICY "Service role can manage verification codes" ON public.verification_codes
  FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON public.verification_codes TO service_role;
