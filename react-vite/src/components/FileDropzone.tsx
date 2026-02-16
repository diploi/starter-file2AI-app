import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

export interface FileDropzoneProps {
  isProcessing: boolean;
  onFilesSelected: (files: FileList | null) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  isProcessing,
  onFilesSelected,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onFilesSelected(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilesSelected(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`file-uploader-dropzone ${isDragging ? 'dragging' : ''} ${isProcessing ? 'disabled' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={isProcessing ? undefined : handleClick}
      role="button"
      tabIndex={isProcessing ? -1 : 0}
      aria-label="Upload file"
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        className="file-input-hidden"
        aria-hidden="true"
        disabled={isProcessing}
      />

      <div className="dropzone-content">
        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>

        <h3 className="dropzone-title">
          {isDragging ? 'Drop file here' : 'Upload a file (optional)'}
        </h3>

        <p className="dropzone-description">
          Tap to browse or drag and drop a file here
        </p>
      </div>
    </div>
  );
};
