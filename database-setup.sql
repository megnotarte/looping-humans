-- AI Portland Networking App - Supabase Database Setup
-- Run this SQL in your Supabase SQL editor to set up the database

-- Create event_state table
CREATE TABLE IF NOT EXISTS public.event_state (
  id BIGSERIAL PRIMARY KEY,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.event_state ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read event state
CREATE POLICY "Allow public read access"
  ON public.event_state
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to insert event state (for admin functionality)
-- In production, you'd want to restrict this to authenticated admin users
CREATE POLICY "Allow public insert access"
  ON public.event_state
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS event_state_created_at_idx
  ON public.event_state (created_at DESC);

-- Insert initial state (event inactive by default)
INSERT INTO public.event_state (is_active, created_at)
VALUES (false, timezone('utc'::text, now()));

-- Enable real-time replication for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_state;

-- Verify setup
SELECT 'Database setup complete!' as status;
SELECT * FROM public.event_state ORDER BY created_at DESC LIMIT 1;
