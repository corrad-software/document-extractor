-- Create the exec_sql function for future use
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create document status enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_status') THEN
    CREATE TYPE document_status AS ENUM (
      'pending',
      'processing',
      'completed',
      'error'
    );
  END IF;
END $$;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  page_count INTEGER,
  status document_status DEFAULT 'pending',
  error_message TEXT,
  processed_pages INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create document_pages table
CREATE TABLE IF NOT EXISTS document_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  image_path TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(document_id, page_number)
);

-- Create document_progress table
CREATE TABLE IF NOT EXISTS document_progress (
  id UUID PRIMARY KEY,
  status TEXT NOT NULL,
  message TEXT,
  current_page INTEGER DEFAULT 0,
  total_pages INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0,
  error TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for documents table
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies safely
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read access" ON documents;
  DROP POLICY IF EXISTS "Allow public insert access" ON documents;
  DROP POLICY IF EXISTS "Allow public update access" ON documents;
  DROP POLICY IF EXISTS "Allow public read access" ON document_pages;
  DROP POLICY IF EXISTS "Allow public insert access" ON document_pages;
  DROP POLICY IF EXISTS "Allow public read access" ON document_progress;
  DROP POLICY IF EXISTS "Allow public insert access" ON document_progress;
  DROP POLICY IF EXISTS "Allow public update access" ON document_progress;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create policies for documents table
CREATE POLICY "Allow public read access" ON documents
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access" ON documents
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public update access" ON documents
  FOR UPDATE TO anon USING (true);

-- Create policies for document_pages table
CREATE POLICY "Allow public read access" ON document_pages
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access" ON document_pages
  FOR INSERT TO anon WITH CHECK (true);

-- Create policies for document_progress table
CREATE POLICY "Allow public read access" ON document_progress
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access" ON document_progress
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public update access" ON document_progress
  FOR UPDATE TO anon USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_document_pages_document_id ON document_pages(document_id);
CREATE INDEX IF NOT EXISTS idx_document_pages_page_number ON document_pages(page_number);
CREATE INDEX IF NOT EXISTS idx_document_progress_updated_at ON document_progress(updated_at);

-- Grant necessary permissions
GRANT ALL ON documents TO anon;
GRANT ALL ON document_pages TO anon;
GRANT ALL ON document_progress TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;