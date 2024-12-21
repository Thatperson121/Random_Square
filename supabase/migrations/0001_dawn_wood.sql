/*
  # Create snippets schema

  1. New Tables
    - `snippets`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `code` (text, required)
      - `language` (text, required)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp with timezone)
      - `tags` (array of text)
      - `is_public` (boolean)

  2. Security
    - Enable RLS
    - Policies for:
      - Anyone can read public snippets
      - Authenticated users can create snippets
      - Users can update/delete their own snippets
*/

CREATE TABLE snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  code text NOT NULL,
  language text NOT NULL,
  author_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  tags text[] DEFAULT '{}',
  is_public boolean DEFAULT true
);

ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read public snippets
CREATE POLICY "Anyone can read public snippets"
  ON snippets
  FOR SELECT
  USING (is_public = true);

-- Policy: Authenticated users can read their own private snippets
CREATE POLICY "Users can read own private snippets"
  ON snippets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

-- Policy: Authenticated users can create snippets
CREATE POLICY "Authenticated users can create snippets"
  ON snippets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policy: Users can update their own snippets
CREATE POLICY "Users can update own snippets"
  ON snippets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policy: Users can delete their own snippets
CREATE POLICY "Users can delete own snippets"
  ON snippets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);