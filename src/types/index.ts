export type ActiveTab = 'chat' | 'code' | 'providers' | 'settings';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  provider?: string;
  model?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

export interface ProjectFile {
  name: string;
  path: string;
  content: string;
}
