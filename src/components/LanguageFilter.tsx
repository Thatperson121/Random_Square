import React from 'react';
import { cn } from '../utils/cn';
import type { Language } from '../types';

interface LanguageFilterProps {
  selected: Language | 'all';
  onChange: (language: Language | 'all') => void;
}

const languages: Array<{ value: Language | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

export function LanguageFilter({ selected, onChange }: LanguageFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            selected === value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}