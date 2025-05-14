'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Link2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MarkdownText from '../MarkdownText';
import { useScroll } from '@/contexts/ScrollContext';

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
  const { isInitialized } = useScroll();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0); // Track active section

  // Sections configuration
  const sections = [
    '#header-visual',
    '#problem-section',
    '#solution-section',
    '#video-section',
    // ...(videoUrl ? ['#video-section'] : []),
  ];

  useGSAP(
    () => {
      // if (!isInitialized) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)', // lg breakpoint
          isMobile: '(max-width: 1023px)',
        },
        (context) => {
          const { isDesktop } = context.conditions!;

          if (isDesktop) {
            // Only run desktop animations on large screens
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              pin: sidebarRef.current,
              pinSpacing: false,
              anticipatePin: 1,
            });

            const sections = gsap.utils.toArray([
              '#header-visual',
              '#problem-section',
              '#solution-section',
              ...(videoUrl ? ['#video-section'] : []),
            ]) as HTMLElement[];

            gsap.set(sections, { autoAlpha: 0, y: 50 });

            let totalHeight = 0;
            const sectionHeights: number[] = [];

            sections.forEach((section) => {
              const height = section.offsetHeight;
              sectionHeights.push(height);
              totalHeight += height;
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: contentRef.current!,
                start: 'top top',
                end: () => `+=${totalHeight}`,
                scrub: true,
                pin: contentRef.current!,
                anticipatePin: 1,
                onRefresh: () => {
                  totalHeight = sections.reduce(
                    (sum, section) => sum + section.offsetHeight,
                    0
                  );
                },
              },
            });

            sections.forEach((section, i) => {
              tl.fromTo(
                section,
                { y: 100 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power2.out',
                }
              )
                .to(section, { duration: 1 })
                .to(section, {
                  autoAlpha: 0,
                  y: -50,
                  duration: 1,
                  ease: 'power2.in',
                })
                .to(
                  contentRef.current!,
                  {
                    y: `-=${sectionHeights[i]}`,
                    duration: 1,
                    ease: 'none',
                  },
                  '<'
                );
            });

            sections.forEach((section, index) => {
              ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: 'top center',
                end: 'bottom center',
                onToggle: (self) => self.isActive && setActiveSection(index),
              });
            });
          } else {
            // Mobile styles reset
            gsap.set(
              [
                '#header-visual',
                '#problem-section',
                '#solution-section',
                ...(videoUrl ? ['#video-section'] : []),
              ],
              { clearProps: 'all' }
            );
          }
        }
      );

      return () => mm.revert();
    },
    { dependencies: [isInitialized], scope: sectionRef }
  );

  const TimelineIndicator = () => (
    <>
      {/* Vertical timeline for lg screens and above */}
      <div className='absolute right-0 top-1/2 hidden h-[36%] -translate-y-1/2 lg:block'>
        <div className='relative h-full w-px bg-white/20'>
          {sections.map((_, index) => (
            <div
              key={`vertical-${index}`}
              className='absolute left-1/2 -translate-x-1/2 transition-all duration-300'
              style={{ top: `${(index * 100) / (sections.length - 1)}%` }}
            >
              <div
                className={`h-3 w-3 rounded-full transition-colors ${
                  index <= activeSection ? 'bg-[#eaf337]' : 'bg-white/20'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal timeline for screens below lg */}
      <div className='absolute top-[calc(100%-16px)] left-1/2 hidden w-[240px] -translate-x-1/2 md:bottom-12 sm:block lg:hidden'>
        <div className='relative h-px w-full bg-white/20'>
          {sections.map((_, index) => (
            <div
              key={`horizontal-${index}`}
              className='absolute top-1/2 -translate-y-1/2 transition-all duration-300'
              style={{ left: `${(index * 100) / (sections.length - 1)}%` }}
            >
              <div
                className={`h-3 w-3 rounded-full transition-colors ${
                  index <= activeSection ? 'bg-[#eaf337]' : 'bg-white/20'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className='flex flex-col lg:flex-row min-h-screen bg-background text-foreground'
    >
      {/* Left Pinned Sidebar */}
      <div
        ref={sidebarRef}
        className='sticky top-[63px] w-full lg:w-[40%] xl:w-[35%] px-2 md:px-10 xl:px-20 bg-background/90 backdrop-blur-md lg:bg-transparent z-10 h-max'
      >
        <div className='lg:max-w-xl space-y-2 lg:space-y-8 flex flex-col items-center justify-center text-center lg:h-[calc(100dvh-64px)] h-max px-4 pt-6 pb-8'>
          <TimelineIndicator />
          <h1 className='text-2xl md:text-4xl font-semibold lg:text-[3.5dvw]'>
            <MarkdownText>{title}</MarkdownText>
          </h1>
          <div className='text-zinc-400 sm:text-xl lg:text-[2dvw]'>
            <MarkdownText>{subTitle}</MarkdownText>
          </div>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-white/10 rounded-full py-2 px-4 lg:py-3 lg:px-6 hover:bg-white/20 transition-colors '
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
        className='w-full lg:flex-1 px-2 md:px-10 xl:px-20 py-10 lg:py-20 {space-y-20}'
      >
        {/* Header Visual */}
        <div
          id='header-visual'
          className='w-full h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden'
        >
          <div className='relative w-full aspect-video rounded-2xl overflow-hidden'>
            <Image
              src='/projects/tutor.jpg'
              alt='Header visual'
              width={1000}
              height={1000}
              className='w-full'
            />
          </div>
        </div>

        {/* Problem Section */}
        <div
          id='problem-section'
          className='w-full h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden'
        >
          <div className='bg-foreground text-background rounded-3xl p-8 space-y-6'>
            <h2 className='text-3xl lg:text-[2dvw] font-bold'>
              <MarkdownText>{problemTitle}</MarkdownText>
            </h2>
            {problemOverview && (
              <div className='text-lg lg:text-[1.2dvw]'>
                <MarkdownText>{problemOverview}</MarkdownText>
              </div>
            )}
            <ul className='space-y-4 pl-6 list-disc'>
              {problems.map((item, idx) => (
                <li key={idx} className='text-lg lg:text-[1.175dvw]'>
                  <MarkdownText>{item}</MarkdownText>
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
        </div>

        {/* Solution Section */}
        <div
          id='solution-section'
          className='w-full h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden'
        >
          <div className='bg-bright-yellow text-background rounded-3xl p-8 space-y-6'>
            <h2 className='text-3xl font-bold lg:text-[2dvw]'>
              <MarkdownText>{solutionTitle}</MarkdownText>
            </h2>
            {solutionOverview && (
              <div className='text-lg lg:text-[1.2dvw]'>
                <MarkdownText>{solutionOverview}</MarkdownText>
              </div>
            )}
            <ul className='space-y-4 pl-6 list-disc'>
              {solutions.map((item, idx) => (
                <li key={idx} className='text-lg lg:text-[1.175dvw]'>
                  <MarkdownText>{item}</MarkdownText>
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
        </div>

        {/* Video Section */}
        {videoUrl && (
          <>
            <div
              id='video-section'
              className='w-full h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden'
            >
              <div className='w-full {space-y-8}'>
                <div className='text-center max-w-3xl mx-auto'>
                  {videoOverview && (
                    <div className='text-xl text-zinc-400'>
                      <MarkdownText>{videoOverview}</MarkdownText>
                    </div>
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
            </div>
            {/* Hidden Spacer Div */}
            <div
              className='aspect-video rounded-2xl overflow-hidden'
              style={{
                opacity: 0,
                pointerEvents: 'none',
              }}
            >
              <iframe
                className='w-full h-full'
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                allowFullScreen
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
