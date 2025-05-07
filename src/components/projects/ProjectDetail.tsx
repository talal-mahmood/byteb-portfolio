'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ProjectDetailProps {
  id?: string;
  title: string;
  subTitle: string;
  overview?: string;
  url?: string;
  problemTitle?: string;
  problemOverview?: string;
  problems?: string[];
  solutionTitle?: string;
  solutionOverview?: string;
  solutions?: string[];
  problemImage?: string;
  solutionImage?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoOverview?: string;
}

export default function ProjectDetail({
  id,
  title,
  subTitle,
  overview,
  url,
  problemTitle = 'Problem',
  problemOverview,
  problems = [],
  solutionTitle = 'Solution',
  solutionOverview,
  solutions = [],
  problemImage,
  solutionImage,
  videoUrl,
  videoTitle,
  videoOverview,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const problemSolutionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const contentHeight = problemSolutionRef.current?.offsetHeight || 0;

      // Set up initial states
      gsap.set(contentRef.current, { y: 0 });
      gsap.set(['#problem-section', '#solution-section', '#video-section'], {
        opacity: 0,
        y: 50,
      });

      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 36px',
          end: 'bottom top',
          scrub: 0.5,
          pin: true,
          markers: true, // Remove in production
          anticipatePin: 1,
        },
      });

      // Animate content sections
      tl.fromTo('#project-content', { y: 100 }, { y: 0, duration: 0.8 })
        .to(
          '#problem-section',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .to(
          '#solution-section',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .fromTo(
          '#project-content',
          { y: 0 },
          {
            y: -contentHeight,
            height: `calc(100%-${contentHeight}px`,
            duration: 0.8,
          }
        )
        .to(
          '#project-solution',
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.8'
        )
        .to(
          '#video-section',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className='px-20 py-10 bg-background text-foreground relative overflow-hidden'
    >
      {/* Pinned Header Section */}
      <div className='max-w-4xl mx-auto space-y-4 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold'>{title}</h1>
        <p className='text-zinc-400 text-lg md:text-xl'>{subTitle}</p>

        <div className='flex gap-2 items-center justify-center mb-5'>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white/10 rounded-full py-2 px-4 font-semibold inline-flex gap-2 hover:opacity-90'
            >
              <Link2 />
              Visit Project
            </a>
          )}
        </div>
      </div>
      {/* Scrollable Content */}
      <div ref={contentRef} id='project-content' className='relative z-0 gap'>
        {/* Two-Column Layout */}
        <div
          ref={problemSolutionRef}
          id='project-solution'
          className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'
        >
          {/* Problems Section */}
          <div
            id='problem-section'
            className='bg-foreground text-background rounded-3xl p-8 flex flex-col h-full w-full'
          >
            <h2 className='text-2xl mb-2 font-bold'>{problemTitle}</h2>
            {problemOverview && <p className='mb-4'>{problemOverview}</p>}
            <ul className='list-disc list-inside space-y-2 flex-1 mb-6  px-4'>
              {problems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {problemImage && (
              <div className='relative h-48 rounded-lg overflow-hidden'>
                <Image
                  src={problemImage}
                  alt='Problem illustration'
                  fill
                  className='object-cover'
                />
              </div>
            )}
          </div>

          {/* Solutions Section */}
          <div
            id='solution-section'
            className='bg-bright-yellow text-background rounded-3xl p-8 flex flex-col h-full w-full'
          >
            <h2 className='text-2xl font-bold mb-2'>{solutionTitle}</h2>
            {solutionOverview && <p className='mb-4'>{solutionOverview}</p>}
            <ul className='list-disc list-inside space-y-2 flex-1 mb-6 px-4'>
              {solutions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {solutionImage && (
              <div className='relative h-48 rounded-lg overflow-hidden'>
                <Image
                  src={solutionImage}
                  alt='Solution illustration'
                  fill
                  className='object-cover'
                />
              </div>
            )}
          </div>
        </div>
        {videoUrl && (
          <div id='video-section' className='{mt-12} space-y-6'>
            <div className='text-center max-w-2xl mx-auto'>
              {/* <h3 className='text-2xl font-semibold mb-2'>
                {videoTitle || 'Project Demo'}
              </h3> */}
              {videoOverview && (
                <p className='text-zinc-400 text-sm'>{videoOverview}</p>
              )}
            </div>
            <div className='aspect-video w-full rounded-xl overflow-hidden'>
              {/* Video player */}
              {/* <video
        src={videoUrl}
        poster={videoThumbnail}
        controls
        autoPlay
        className='w-full max-w-4xl rounded-2xl shadow-2xl'
      /> */}
              <iframe
                className='w-[calc(100%-200px)] h-[calc(100%-248px)] rounded-xl m-auto'
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Embedded youtube'
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
