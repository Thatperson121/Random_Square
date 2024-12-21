import React, { useState } from 'react';
import { LanguageFilter } from '../components/LanguageFilter';
import { SnippetCard } from '../components/SnippetCard';
import { SearchBar } from '../components/SearchBar';
import { useSnippets } from '../hooks/useSnippets';
import type { Language } from '../types';

export function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { snippets, loading, error } = useSnippets(selectedLanguage);

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Latest Code Snippets</h1>
        <div className="w-full sm:w-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      <LanguageFilter
        selected={selectedLanguage}
        onChange={setSelectedLanguage}
      />

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading snippets...</p>
        </div>
      ) : filteredSnippets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No snippets found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}