'use client';

import { useRef, useEffect } from 'react';
import { Mic, PhoneOff } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface CallButtonProps {
  callStatus: 'idle' | 'active' | 'ended';
  chatTitle: string;
  onStart: () => void;
  onEnd: () => void;
}

export default function CallButton({
  callStatus,
  chatTitle,
  onStart,
  onEnd,
}: CallButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(iconRef.current, { transformOrigin: 'center' });

      timeline.current = gsap
        .timeline({ paused: true })
        .to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          iconRef.current,
          {
            scale: 1.2,
            y: -2,
            rotate: '-15deg',
            duration: 0.3,
            ease: 'elastic.out(1.2, 0.3)',
          },
          '<'
        )
        .to(
          buttonRef.current,
          {
            boxShadow: '0 8px 24px rgba(234, 243, 55, 0.3)',
            duration: 0.4,
          },
          '<'
        );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (callStatus === 'active') {
        // Active state animation
        gsap.to(iconRef.current, {
          keyframes: [
            { scale: 1.1, y: -2, duration: 0.8, ease: 'power2.inOut' },
            { scale: 1, y: 0, duration: 0.8, ease: 'power2.inOut' },
          ],
          repeat: -1,
          yoyo: true,
        });

        gsap.to(buttonRef.current, {
          background: 'linear-gradient(45deg, #eaf337, #c4d32c)',
          duration: 0.5,
        });
      } else if (callStatus === 'idle') {
        // Reset to idle state
        gsap.killTweensOf([iconRef.current, buttonRef.current]);
        gsap.to([iconRef.current, buttonRef.current], {
          scale: 1,
          rotate: 0,
          background: '#eaf337',
          boxShadow: '0 4px 12px rgba(234, 243, 55, 0.2)',
          duration: 0.3,
        });
      } else if (callStatus === 'ended') {
        // Ended state animation
        // gsap.to(buttonRef.current, {
        //   background: '#666',
        //   color: '#999',
        //   duration: 0.5,
        // });
        // gsap.to(iconRef.current, {
        //   scale: 0.9,
        //   opacity: 0.5,
        //   duration: 0.3,
        // });
      }
    },
    { dependencies: [callStatus] }
  );

  const handleHover = () => {
    if (callStatus !== 'active' && callStatus !== 'ended') {
      timeline.current?.play();
    }
  };

  const handleHoverEnd = () => {
    if (callStatus !== 'active' && callStatus !== 'ended') {
      timeline.current?.reverse();
    }
  };

  return (
    <div ref={containerRef} className='relative'>
      {callStatus === 'active' ? (
        <button
          ref={buttonRef}
          onClick={onEnd}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverEnd}
          className='bg-foreground text-background rounded-full px-8 py-6 flex items-center gap-2 shadow-lg relative overflow-hidden'
        >
          <PhoneOff
            ref={iconRef}
            className='w-[2dvw] h-[2dvw] -mb-0.5 transform transition-transform'
          />
          <span>End Call</span>
          {/* Active state glow */}
          {callStatus === 'active' && (
            <div className='absolute inset-0 bg-bright-yellow/20 animate-pulse rounded-full' />
          )}
        </button>
      ) : (
        <button
          ref={buttonRef}
          onClick={onStart}
          disabled={callStatus === 'ended'}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverEnd}
          className='bg-bright-yellow text-background rounded-full px-8 py-6 flex items-center gap-2 shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Mic
            ref={iconRef}
            className='w-[2dvw] h-[2dvw] -mb-0.5 transform transition-transform'
          />
          <span>{callStatus === 'ended' ? 'Call Ended' : chatTitle}</span>
          {/* Hover overlay */}
          <div className='absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full' />
        </button>
      )}
    </div>
  );
}
