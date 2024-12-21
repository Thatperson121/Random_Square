import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Snippet } from '../types';

export function useSnippets(language: string = 'all') {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        let query = supabase
          .from('snippets')
          .select('*')
          .order('created_at', { ascending: false });

        if (language !== 'all') {
          query = query.eq('language', language);
        }

        const { data, error: err } = await query;

        if (err) throw err;
        setSnippets(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [language]);

  const createSnippet = async (snippet: Omit<Snippet, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('snippets')
        .insert(snippet)
        .select()
        .single();

      if (error) throw error;
      setSnippets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create snippet');
    }
  };

  return { snippets, loading, error, createSnippet };
}