import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, User } from 'lucide-react';
import type { Snippet } from '../types';

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <Link to={`/snippet/${snippet.id}`}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{snippet.title}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {snippet.language}
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {snippet.description}
          </p>

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {snippet.author || 'Anonymous'}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(snippet.createdAt).toLocaleDateString()}
            </div>
            {snippet.tags.length > 0 && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {snippet.tags.slice(0, 2).join(', ')}
                {snippet.tags.length > 2 && '...'}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}