import { useState, useRef, useCallback } from 'react';

export interface UseMediaRecorderReturn {
  isRecordingAudio: boolean;
  isRecordingVideo: boolean;
  isRecording: boolean;
  videoPreviewRef: React.RefObject<HTMLVideoElement | null>;
  startAudioRecording: () => Promise<void>;
  startVideoRecording: () => Promise<void>;
  stopRecording: () => void;
}

export function useMediaRecorder(attachFile: (file: File) => void): UseMediaRecorderReturn {
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const stopMediaStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const startAudioRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaChunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(mediaChunksRef.current, { type: 'audio/webm' });
        const file = new File([blob], `audio-recording-${Date.now()}.webm`, { type: 'audio/webm' });
        attachFile(file);
        stopMediaStream();
        setIsRecordingAudio(false);
      };

      recorder.start();
      setIsRecordingAudio(true);
    } catch (error) {
      console.error('Failed to start audio recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  }, [attachFile, stopMediaStream]);

  const startVideoRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      mediaChunksRef.current = [];

      // Show live preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(mediaChunksRef.current, { type: 'video/webm' });
        const file = new File([blob], `video-recording-${Date.now()}.webm`, { type: 'video/webm' });
        attachFile(file);
        stopMediaStream();
        setIsRecordingVideo(false);
      };

      recorder.start();
      setIsRecordingVideo(true);
    } catch (error) {
      console.error('Failed to start video recording:', error);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  }, [attachFile, stopMediaStream]);

  return {
    isRecordingAudio,
    isRecordingVideo,
    isRecording: isRecordingAudio || isRecordingVideo,
    videoPreviewRef,
    startAudioRecording,
    startVideoRecording,
    stopRecording,
  };
}
