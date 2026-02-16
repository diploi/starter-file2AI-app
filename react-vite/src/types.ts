export interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'error' | 'processing' | 'notification';
  content: string;
  timestamp: Date;
  files?: string[];
}
