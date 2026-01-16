-- Create the rooms table
create table public.rooms (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price numeric not null,
  location text not null,
  property_type text not null, -- '1 BHK', '2 BHK', 'PG' etc.
  tenant_preference text not null, -- 'Bachelor', 'Family', 'Any'
  image_url text, -- Storage URL
  contact_phone text,
  owner_id uuid references auth.users not null
);

-- Enable RLS
alter table public.rooms enable row level security;

-- Policies
-- 1. Everyone can view rooms
create policy "Rooms are public" on public.rooms
  for select using (true);

-- 2. Only authenticated users can insert (Owners)
create policy "Users can insert their own rooms" on public.rooms
  for insert with check (auth.uid() = owner_id);

-- 3. Users can update their own rooms
create policy "Users can update their own rooms" on public.rooms
  for update using (auth.uid() = owner_id);

-- 4. Users can delete their own rooms
create policy "Users can delete their own rooms" on public.rooms
  for delete using (auth.uid() = owner_id);

-- Setup Storage Bucket for room-images
-- Note: You'll need to create a bucket named 'room-images' in Supabase Storage and make it public.
