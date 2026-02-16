import React from 'react';
import { UploadedFile } from '../types';
import { formatFileSize } from '../utils';

export interface AttachedFileCardProps {
  file: UploadedFile;
  isProcessing: boolean;
  onRemove: () => void;
}

export const AttachedFileCard: React.FC<AttachedFileCardProps> = ({
  file,
  isProcessing,
  onRemove,
}) => {
  return (
    <div className="attached-file-section">
      <div className="file-card">
        <button
          className="remove-file-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isProcessing}
          aria-label={`Remove ${file.file.name}`}
        >
          ×
        </button>

        {file.preview && file.file.type.startsWith('image/') ? (
          <div className="file-preview">
            <img src={file.preview} alt={file.file.name} />
          </div>
        ) : file.preview && file.file.type.startsWith('audio/') ? (
          <div className="file-preview-media">
            <audio src={file.preview} controls />
          </div>
        ) : file.preview && file.file.type.startsWith('video/') ? (
          <div className="file-preview-media">
            <video src={file.preview} controls className="video-thumbnail" />
          </div>
        ) : (
          <div className="file-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}

        <div className="file-info">
          <p className="file-name" title={file.file.name}>
            {file.file.name}
          </p>
          <p className="file-size">
            {formatFileSize(file.file.size)}
          </p>
        </div>
      </div>
    </div>
  );
};
