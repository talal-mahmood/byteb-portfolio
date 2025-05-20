'use client';

import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  audioData: number[];
  volumeLevel: number;
  isSpeaking: boolean;
}

export default function AudioVisualizer({
  audioData,
  volumeLevel,
  isSpeaking,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match its display size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Clear canvas with a semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Skip drawing if no audio data
    if (audioData.length === 0) return;

    // Configuration for the brick visualization
    const barCount = audioData.length;
    const barWidth = rect.width / barCount;
    const brickHeight = 6; // Height of each brick
    const brickGap = 2; // Gap between bricks
    const brickRounding = 2; // Rounded corners for bricks

    // Draw each frequency bar with bricks
    for (let i = 0; i < barCount; i++) {
      const amplitude = audioData[i] || 0;

      // Skip very low amplitudes for cleaner visualization
      if (amplitude < 0.02) continue;

      // Calculate bar height based on audio amplitude
      const barHeight = amplitude * rect.height * 0.8;
      const x = i * barWidth;

      // Calculate how many bricks we need
      const brickCount = Math.floor(barHeight / (brickHeight + brickGap));

      // Draw each brick in the bar
      for (let j = 0; j < brickCount; j++) {
        const y = rect.height - (j + 1) * (brickHeight + brickGap);

        // Calculate brick opacity based on position and amplitude
        const positionFactor = j / brickCount; // 0 at bottom, 1 at top
        const opacityBase = isSpeaking ? 0.4 : 0.2;
        const opacityBoost = isSpeaking ? 0.6 : 0.3;
        const opacity = opacityBase + positionFactor * opacityBoost;

        // Use bright-yellow color with varying opacity
        ctx.fillStyle = `rgba(234, 243, 55, ${opacity})`;

        // Draw rounded rectangle for brick
        ctx.beginPath();
        ctx.roundRect(
          x + 1, // Add small gap between bars
          y,
          barWidth - 2, // Subtract gap from width
          brickHeight,
          brickRounding
        );
        ctx.fill();
      }
    }

    // Add a subtle glow effect at the bottom when speaking
    if (isSpeaking && volumeLevel > 0.1) {
      const gradient = ctx.createLinearGradient(
        0,
        rect.height,
        0,
        rect.height - 100
      );
      gradient.addColorStop(0, `rgba(234, 243, 55, ${volumeLevel * 0.3})`);
      gradient.addColorStop(1, 'rgba(234, 243, 55, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, rect.height - 100, rect.width, 100);
    }
  }, [audioData, volumeLevel, isSpeaking]);

  return (
    <canvas
      ref={canvasRef}
      className='w-full h-full absolute inset-0'
      aria-hidden='true'
    />
  );
}
