import React from 'react';

export interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  isProcessing: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  onPromptChange,
  isProcessing,
}) => {
  return (
    <div className="prompt-section">
      <label htmlFor="prompt" className="prompt-label">
        Your Prompt
      </label>
      <textarea
        id="prompt"
        className="prompt-input"
        placeholder="Describe what you want to do with the file..."
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={3}
        disabled={isProcessing}
      />
    </div>
  );
};
