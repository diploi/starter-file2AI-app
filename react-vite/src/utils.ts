import { Message } from './types';

export function getSessionId(): string {
  let id = sessionStorage.getItem('ws_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('ws_session_id', id);
  }
  return id;
}

export function loadMessages(storageKey: string): Message[] {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: Message[] = JSON.parse(saved, (key, value) =>
        key === 'timestamp' ? new Date(value) : value
      );
      // Filter out stale processing messages from a previous session
      return parsed.filter(m => m.type !== 'processing');
    }
  } catch (error) {
    console.error('Error loading messages', error)
  }
  return [];
}

export function getDefaultPrompt(fileType: string): string {
  if (fileType.startsWith('audio/')) {
    return 'Transcribe this audio to plain text. Output only the transcription, nothing else.';
  }
  if (fileType.startsWith('video/')) {
    return 'Transcribe the audio from this video to plain text. Output only the transcription, nothing else.';
  }
  if (fileType.startsWith('image/')) {
    return 'Extract all text from this image to plain text. Output only the transcription, nothing else.';
  }
  // Text and other files
  return 'Extract the text content from this file. Output only the extracted text, nothing else.';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
