'use client';
import { useRef } from 'react';
import { Mic, PhoneOff } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useVapi } from '@/hooks/useVapi';

// In your AnimatedMicIcon component
export default function AnimatedMicIcon() {
  const micRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { callState } = useVapi();

  useGSAP(() => {
    // Mic animation timeline
    const tl = gsap.timeline({ paused: true });

    // Scale animation with elastic bounce
    tl.to(
      micRef.current,
      {
        scale: 1.2,
        duration: 0.8,
        ease: 'elastic.out(1.2, 0.3)',
      },
      0
    );

    // Glow effect
    tl.to(
      glowRef.current,
      {
        scale: 1.5,
        opacity: 0.4,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      },
      0
    );

    // Pulse animation
    tl.to(
      micRef.current,
      {
        keyframes: [
          {
            filter: 'drop-shadow(0 0 4px rgba(234, 243, 55, 0.8))',
            duration: 0.8,
          },
          {
            filter: 'drop-shadow(0 0 8px rgba(234, 243, 55, 0.4))',
            duration: 0.8,
          },
        ],
        repeat: -1,
        ease: 'power2.inOut',
      },
      0
    );

    // Start/stop based on call state
    if (callState === 'active') {
      tl.play();
    } else {
      tl.reverse();
    }

    return () => tl.kill();
  }, [callState]);

  return (
    <div className='relative'>
      {/* Glow element */}
      <div
        ref={glowRef}
        className='absolute inset-0 bg-bright-yellow/30 rounded-full blur-xl'
        aria-hidden
      />

      <Mic
        ref={micRef}
        className={`w-5 h-5 transition-colors ${
          callState === 'active' ? 'text-bright-yellow' : 'text-background'
        }`}
      />
    </div>
  );
}
