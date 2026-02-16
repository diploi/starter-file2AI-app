import React from 'react';
import { Message } from '../types';
import { formatTime } from '../utils';

export interface MessageListProps {
  messages: Message[];
  copiedMessageId: string | null;
  onCopyMessage: (messageId: string, content: string) => void;
  onClearMessages: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  copiedMessageId,
  onCopyMessage,
  onClearMessages,
  messagesEndRef,
}) => {
  if (messages.length === 0) return null;

  return (
    <div className="messages-section">
      <div className="messages-header">
        <h4>Conversation</h4>
        <button
          className="clear-messages-button"
          onClick={onClearMessages}
        >
          Clear
        </button>
      </div>
      <div className="messages-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message message-${message.type}`}
          >
            <div className="message-content">
              {message.type === 'processing' ? (
                <div className="processing-indicator">
                  <div className="spinner"></div>
                  <span>{message.content}</span>
                </div>
              ) : (
                <>
                  {message.files && message.files.length > 0 && (
                    <div className="message-files">
                      {message.files.join(', ')}
                    </div>
                  )}
                  <p>{message.content}</p>
                </>
              )}
            </div>
            {message.type !== 'processing' && (
              <div className="message-actions">
                <button
                  className="copy-message-button"
                  onClick={() => onCopyMessage(message.id, message.content)}
                  title="Copy message"
                >
                  {copiedMessageId === message.id ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="copy-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="copy-icon">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            )}
            <div className="message-time">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
