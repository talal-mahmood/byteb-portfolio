'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
  title,
  subTitle,
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
  videoOverview,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: sidebarRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });
        },
        '(max-width: 1023px)': () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: sidebarRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });
        },
      });

      gsap.utils
        .toArray(['#problem-section', '#solution-section', '#video-section'])
        .forEach((section: any) => {
          gsap.from(section, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
              trigger: section,
              start: 'top center+=100',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
          });
        });

      gsap.from('#header-visual', {
        scale: 1.1,
        scrollTrigger: {
          trigger: '#header-visual',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className='flex flex-col lg:flex-row min-h-screen bg-background text-foreground'
    >
      {/* Left Pinned Sidebar */}
      <div
        ref={sidebarRef}
        className='sticky top-[63px] lg:top-[10dvh] w-full lg:w-[40%] xl:w-[35%] px-2 md:px-10 xl:px-20 py-3 lg:py-20 bg-background/90 backdrop-blur-md lg:bg-transparent z-10 h-max'
      >
        <div className='lg:max-w-xl space-y-2 lg:space-y-8 max-lg:flex flex-col items-center text-center h-max'>
          <h1 className='text-2xl md:text-4xl xl:text-5xl font-bold'>
            {title}
          </h1>
          <p className='text-zinc-400 sm:text-xl'>{subTitle}</p>

          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-white/10 rounded-full py-2 px-4 lg:py-3 lg:px-6 hover:bg-white/20 transition-colors'
            >
              <Link2 className='w-5 h-5' />
              Visit Project
            </a>
          )}
        </div>
      </div>

      {/* Scrollable Right Content */}
      <div
        ref={contentRef}
        className='w-full lg:flex-1 px-2 md:px-10 xl:px-20 py-10 lg:py-20 space-y-20'
      >
        {/* Header Visual moved into content */}
        <div
          id='header-visual'
          className='relative w-full aspect-square rounded-2xl overflow-hidden mt-8'
        >
          <Image
            src='/projects/tutor.jpg'
            alt='Header visual'
            fill
            className='object-cover'
          />
        </div>

        {/* Problem Section */}
        <div
          id='problem-section'
          className='bg-foreground text-background rounded-3xl p-8 space-y-6'
        >
          <h2 className='text-3xl font-bold'>{problemTitle}</h2>
          {problemOverview && <p className='text-lg'>{problemOverview}</p>}
          <ul className='space-y-4 pl-6 list-disc'>
            {problems.map((item, idx) => (
              <li key={idx} className='text-lg'>
                {item}
              </li>
            ))}
          </ul>
          {problemImage && (
            <div className='relative h-64 rounded-xl overflow-hidden'>
              <Image
                src={problemImage}
                alt='Problem illustration'
                fill
                className='object-cover'
              />
            </div>
          )}
        </div>

        {/* Solution Section */}
        <div
          id='solution-section'
          className='bg-bright-yellow text-background rounded-3xl p-8 space-y-6'
        >
          <h2 className='text-3xl font-bold'>{solutionTitle}</h2>
          {solutionOverview && <p className='text-lg'>{solutionOverview}</p>}
          <ul className='space-y-4 pl-6 list-disc'>
            {solutions.map((item, idx) => (
              <li key={idx} className='text-lg'>
                {item}
              </li>
            ))}
          </ul>
          {solutionImage && (
            <div className='relative h-64 rounded-xl overflow-hidden'>
              <Image
                src={solutionImage}
                alt='Solution illustration'
                fill
                className='object-cover'
              />
            </div>
          )}
        </div>

        {/* Video Section */}
        {videoUrl && (
          <div id='video-section' className='space-y-8'>
            <div className='text-center max-w-3xl mx-auto'>
              {videoOverview && (
                <p className='text-xl text-zinc-400'>{videoOverview}</p>
              )}
            </div>
            <div className='aspect-video rounded-2xl overflow-hidden'>
              <iframe
                className='w-full h-full'
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
