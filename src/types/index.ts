export type Language = 'javascript' | 'typescript' | 'python' | 'html' | 'css';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: Language;
  author?: string;
  createdAt: Date;
  tags: string[];
}