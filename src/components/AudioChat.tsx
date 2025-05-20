'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, PhoneOff } from 'lucide-react';
import { useVapi } from '@/hooks/useVapi';
import MarkdownText from './MarkdownText';
import BrickVisualizer from './AudioVisualizer';
import CallButton from './CallButton';

interface AudioChatProps {
  assistantId?: string;
  chatTitle?: string;
  chatOverview?: string;
  maxDuration?: number; // in seconds
}

export default function AudioChat({
  assistantId = 'your-default-assistant-id',
  chatTitle = 'Talk to our AI',
  chatOverview = 'Experience our solution firsthand with a live conversation',
  maxDuration = 300, // 5 minutes in seconds
}: AudioChatProps) {
  const [callStatus, setCallStatus] = useState<'idle' | 'active' | 'ended'>(
    'idle'
  );
  const [timeRemaining, setTimeRemaining] = useState(maxDuration);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio processing state
  const [audioData, setAudioData] = useState<{
    frequencyData: number[];
    volumeLevel: number;
    isSpeaking: boolean;
  }>({
    frequencyData: Array(32).fill(0),
    volumeLevel: 0,
    isSpeaking: false,
  });

  // Initialize Vapi hook
  const { startCall, stopCall, callState } = useVapi();

  // Set up audio processing
  useEffect(() => {
    if (callStatus !== 'active') return;

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let audioStream: MediaStream | null = null;
    let animationFrame: number | null = null;

    const setupAudio = async () => {
      try {
        // Request microphone access
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        // Create audio context and analyzer
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Smaller FFT size for fewer, wider bars
        analyser.smoothingTimeConstant = 0.7;

        // Connect microphone to analyzer
        microphone = audioContext.createMediaStreamSource(audioStream);
        microphone.connect(analyser);

        // Start visualization loop
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        const updateVisualization = () => {
          if (!analyser) return;

          analyser.getByteFrequencyData(frequencyData);

          // Calculate volume level (0-1)
          const sum = frequencyData.reduce((acc, val) => acc + val, 0);
          const average = sum / frequencyData.length / 255;

          // Normalize frequency data to 0-1 range
          const normalizedData = Array.from(frequencyData).map(
            (val) => val / 255
          );

          // Detect if speaking (simple threshold)
          const isSpeaking = average > 0.05;

          setAudioData({
            frequencyData: normalizedData,
            volumeLevel: average,
            isSpeaking,
          });

          animationFrame = requestAnimationFrame(updateVisualization);
        };

        updateVisualization();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    setupAudio();

    // Cleanup function
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (microphone) microphone.disconnect();
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [callStatus]);

  const handleStartCall = async () => {
    try {
      setCallStatus('active');

      // Start the call with your Vapi assistant
      await startCall({
        assistantId,
        // Add any other Vapi configuration options here
      });

      // Start countdown timer
      let remaining = maxDuration;
      const countdown = setInterval(() => {
        remaining -= 1;
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          handleEndCall();
        }
      }, 1000);

      setTimer(countdown);
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('idle');
    }
  };

  const handleEndCall = async () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    try {
      await stopCall();
    } catch (error) {
      console.error('Error ending call:', error);
    } finally {
      setCallStatus('ended');
      setTimeRemaining(maxDuration);

      // Reset to idle after a brief delay
      setTimeout(() => setCallStatus('idle'), 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      id='video-section'
      className='w-full h-max lg:h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <div
          ref={containerRef}
          className='relative bg-foreground/6 backdrop-blur-md rounded-3xl p-8 shadow-lg overflow-hidden'
        >
          {/* Audio Visualizer Background */}
          {callStatus === 'active' && (
            <div className='absolute inset-0 z-0'>
              <BrickVisualizer
                audioData={audioData.frequencyData}
                volumeLevel={audioData.volumeLevel}
                isSpeaking={audioData.isSpeaking}
              />
            </div>
          )}

          <div className='flex flex-col {md:flex-row} items-center justify-between gap-6 relative z-10'>
            {/* Left side: Explanation */}
            <div className='text-left space-y-3'>
              <div className='text-zinc-400'>
                <MarkdownText>{chatOverview}</MarkdownText>
              </div>

              {callStatus === 'active' && (
                <div className='flex items-center mt-2'>
                  <div className='w-3 h-3 rounded-full bg-bright-yellow animate-pulse mr-2'></div>
                  <span className='text-sm font-medium'>
                    Call in progress • {formatTime(timeRemaining)} remaining
                  </span>
                </div>
              )}
            </div>

            {/* Right side: Button */}
            {/* Right side: Button */}
            <div className='flex justify-center md:justify-end text-[2dvw] font-semibold'>
              <CallButton
                callStatus={callStatus}
                chatTitle={chatTitle}
                onStart={handleStartCall}
                onEnd={handleEndCall}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
