import React from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { githubLight } from '@uiw/codemirror-theme-github';
import { Clock, Copy, User } from 'lucide-react';
import type { Snippet } from '../types';

// Mock data for demonstration
const mockSnippet: Snippet = {
  id: '1',
  title: 'React useEffect Hook Example',
  description: 'A simple example demonstrating the usage of the useEffect hook in React',
  code: 'useEffect(() => {\n  console.log("Component mounted");\n  return () => console.log("Component unmounted");\n}, []);',
  language: 'typescript',
  author: 'johndoe',
  createdAt: new Date('2024-02-20'),
  tags: ['react', 'hooks', 'frontend'],
};

export function SnippetPage() {
  const { id } = useParams();
  const snippet = mockSnippet; // In a real app, fetch based on id

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{snippet.title}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {snippet.language}
            </span>
          </div>

          <p className="text-gray-600">{snippet.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {snippet.author || 'Anonymous'}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(snippet.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-100"
              title="Copy code"
            >
              <Copy className="h-5 w-5 text-gray-500" />
            </button>
            <div className="border rounded-md overflow-hidden">
              <CodeMirror
                value={snippet.code}
                theme={githubLight}
                extensions={[snippet.language === 'python' ? python() : javascript()]}
                editable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}