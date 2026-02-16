import React from 'react';

export interface MediaControlsProps {
  isRecordingAudio: boolean;
  isRecordingVideo: boolean;
  isProcessing: boolean;
  videoPreviewRef: React.RefObject<HTMLVideoElement | null>;
  onStartAudioRecording: () => void;
  onStartVideoRecording: () => void;
  onStopRecording: () => void;
}

export const MediaControls: React.FC<MediaControlsProps> = ({
  isRecordingAudio,
  isRecordingVideo,
  isProcessing,
  videoPreviewRef,
  onStartAudioRecording,
  onStartVideoRecording,
  onStopRecording,
}) => {
  return (
    <>
      {/* Video Recording Preview */}
      {isRecordingVideo && (
        <div className="video-preview-container">
          <video ref={videoPreviewRef} className="video-preview" muted playsInline />
          <div className="recording-overlay">
            <span className="recording-dot"></span> Recording video...
          </div>
        </div>
      )}

      {/* Audio Recording Indicator */}
      {isRecordingAudio && (
        <div className="audio-recording-indicator">
          <span className="recording-dot"></span>
          <span>Recording audio...</span>
        </div>
      )}

      {/* Media Buttons */}
      <div className="media-buttons">
        <button
          className={`media-button ${isRecordingAudio ? 'recording' : ''}`}
          onClick={isRecordingAudio ? onStopRecording : onStartAudioRecording}
          disabled={isProcessing || isRecordingVideo}
          title={isRecordingAudio ? 'Stop recording' : 'Record audio'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="media-button-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          {isRecordingAudio ? 'Stop' : 'Audio'}
        </button>

        <button
          className={`media-button ${isRecordingVideo ? 'recording' : ''}`}
          onClick={isRecordingVideo ? onStopRecording : onStartVideoRecording}
          disabled={isProcessing || isRecordingAudio}
          title={isRecordingVideo ? 'Stop recording' : 'Record video'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="media-button-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {isRecordingVideo ? 'Stop' : 'Video'}
        </button>
      </div>
    </>
  );
};
