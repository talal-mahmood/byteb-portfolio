'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiConfig {
  assistantId?: string;
  onCallStarted?: () => void;
  onCallEnded?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}

export const useVapi = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const [callState, setCallState] = useState<'idle' | 'active' | 'loading'>(
    'idle'
  );
  const [isMicOn, setIsMicOn] = useState(false);
  // const [transcript, setTranscript] = useState('');
  const configRef = useRef<VapiConfig>({});

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!key) {
      console.error('Missing VAPI_PUBLIC_KEY');
      return;
    }

    const vapi = new Vapi(key);
    vapiRef.current = vapi;

    // Event handlers
    const handleCallStart = () => {
      setCallState('active');
      configRef.current.onCallStarted?.();
    };

    const handleCallEnd = () => {
      setCallState('idle');
      configRef.current.onCallEnded?.();
    };

    const handleSpeechStart = () => setIsMicOn(true);
    const handleSpeechEnd = () => setIsMicOn(false);
    const handleError = (error: any) => {
      console.error('Vapi error:', error);
      configRef.current.onError?.(error);
    };

    // Register events
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('error', handleError);

    return () => {
      // Cleanup
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('error', handleError);

      if (callState === 'active') {
        vapi.stop();
      }
    };
  }, []);

  const startCall = useCallback(async (config: VapiConfig) => {
    if (!vapiRef.current) return;
    configRef.current = config;

    try {
      setCallState('loading');
      await vapiRef.current.start(config.assistantId);
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallState('idle');
      config.onError?.(error);
    }
  }, []);

  const stopCall = useCallback(async () => {
    if (!vapiRef.current) return;

    try {
      // Force stop and reset the Vapi instance
      await vapiRef.current.stop();

      // Completely reset the Vapi client
      const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (key) {
        vapiRef.current = new Vapi(key);
        // Re-initialize event listeners here if needed
      }
    } catch (error) {
      console.error('Failed to stop call:', error);
    }
  }, []);

  const toggleMic = useCallback(async () => {
    if (!vapiRef.current) return;

    try {
      if (isMicOn) {
        await vapiRef.current.setMuted(true);
      } else {
        await vapiRef.current.setMuted(false);
      }
      setIsMicOn(!isMicOn);
    } catch (error) {
      console.error('Failed to toggle mic:', error);
      configRef.current.onError?.(error);
    }
  }, [isMicOn]);

  return {
    startCall,
    stopCall,
    toggleMic,
    callState,
    isMicOn,
    // transcript,
    isActive: callState === 'active',
    isLoading: callState === 'loading',
  };
};
