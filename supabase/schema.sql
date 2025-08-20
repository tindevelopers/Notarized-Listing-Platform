
-- Enable Row Level Security and necessary extensions
alter database postgres set timezone to 'UTC';

-- Create custom extensions if needed
create extension if not exists "uuid-ossp";

-- Create profiles table (linked to auth.users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notaries table
create table if not exists public.notaries (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    business_name text,
    description text,
    phone text,
    address text,
    city text not null,
    state text not null,
    zip_code text,
    latitude decimal,
    longitude decimal,
    languages text[] default array[]::text[],
    services text[] default array[]::text[],
    availability jsonb,
    hourly_rate decimal,
    travel_radius integer,
    is_mobile boolean default false,
    is_online boolean default false,
    is_verified boolean default false,
    rating decimal default 0,
    review_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reviews table
create table if not exists public.reviews (
    id uuid default uuid_generate_v4() primary key,
    notary_id uuid references public.notaries(id) on delete cascade not null,
    reviewer_id uuid references public.profiles(id) on delete cascade not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text,
    service_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(notary_id, reviewer_id)
);

-- Create bookings table
create table if not exists public.bookings (
    id uuid default uuid_generate_v4() primary key,
    notary_id uuid references public.notaries(id) on delete cascade not null,
    client_id uuid references public.profiles(id) on delete cascade not null,
    service_type text not null,
    service_date date not null,
    service_time time not null,
    location text,
    notes text,
    status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    total_cost decimal,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists notaries_profile_id_idx on public.notaries(profile_id);
create index if not exists notaries_location_idx on public.notaries(city, state);
create index if not exists notaries_services_idx on public.notaries using gin(services);
create index if not exists notaries_rating_idx on public.notaries(rating desc);
create index if not exists reviews_notary_id_idx on public.reviews(notary_id);
create index if not exists bookings_notary_id_idx on public.bookings(notary_id);
create index if not exists bookings_client_id_idx on public.bookings(client_id);
create index if not exists bookings_date_idx on public.bookings(service_date);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.notaries enable row level security;
alter table public.reviews enable row level security;
alter table public.bookings enable row level security;

-- Create policies for profiles
create policy "Users can view all profiles" on public.profiles
    for select using (true);

create policy "Users can update their own profile" on public.profiles
    for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
    for insert with check (auth.uid() = id);

-- Create policies for notaries
create policy "Anyone can view notaries" on public.notaries
    for select using (true);

create policy "Users can update their own notary profile" on public.notaries
    for update using (auth.uid() = profile_id);

create policy "Users can insert their own notary profile" on public.notaries
    for insert with check (auth.uid() = profile_id);

-- Create policies for reviews
create policy "Anyone can view reviews" on public.reviews
    for select using (true);

create policy "Users can insert their own reviews" on public.reviews
    for insert with check (auth.uid() = reviewer_id);

create policy "Users can update their own reviews" on public.reviews
    for update using (auth.uid() = reviewer_id);

-- Create policies for bookings
create policy "Users can view their own bookings" on public.bookings
    for select using (auth.uid() = client_id or auth.uid() = (
        select profile_id from public.notaries where id = notary_id
    ));

create policy "Users can insert their own bookings" on public.bookings
    for insert with check (auth.uid() = client_id);

create policy "Users can update bookings they're involved in" on public.bookings
    for update using (auth.uid() = client_id or auth.uid() = (
        select profile_id from public.notaries where id = notary_id
    ));

-- Create function to automatically create a profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, avatar_url)
    values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger to call the function on user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger profiles_updated_at before update on public.profiles
    for each row execute procedure public.update_updated_at_column();

create trigger notaries_updated_at before update on public.notaries
    for each row execute procedure public.update_updated_at_column();

create trigger reviews_updated_at before update on public.reviews
    for each row execute procedure public.update_updated_at_column();

create trigger bookings_updated_at before update on public.bookings
    for each row execute procedure public.update_updated_at_column();

-- Function to update notary rating based on reviews
create or replace function public.update_notary_rating()
returns trigger as $$
begin
    -- Update the notary's rating and review count
    update public.notaries
    set 
        rating = (
            select avg(rating)::decimal
            from public.reviews
            where notary_id = coalesce(new.notary_id, old.notary_id)
        ),
        review_count = (
            select count(*)
            from public.reviews
            where notary_id = coalesce(new.notary_id, old.notary_id)
        )
    where id = coalesce(new.notary_id, old.notary_id);
    
    return coalesce(new, old);
end;
$$ language plpgsql security definer;

-- Create triggers to update rating when reviews are added/updated/deleted
create trigger reviews_rating_update after insert or update or delete on public.reviews
    for each row execute procedure public.update_notary_rating();
