-- Session Analytics - Supabase Database Setup
-- Run this SQL in your Supabase SQL editor to add session tracking

-- Create sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id BIGSERIAL PRIMARY KEY,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  participants_count INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read sessions
CREATE POLICY "Allow public read access"
  ON public.sessions
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to insert sessions (for admin functionality)
CREATE POLICY "Allow public insert access"
  ON public.sessions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to update sessions (for incrementing count and ending)
CREATE POLICY "Allow public update access"
  ON public.sessions
  FOR UPDATE
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS sessions_started_at_idx
  ON public.sessions (started_at DESC);

CREATE INDEX IF NOT EXISTS sessions_active_idx
  ON public.sessions (is_active);

-- Enable real-time replication for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;

-- Verify setup
SELECT 'Sessions table setup complete!' as status;
