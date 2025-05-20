'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Link2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MarkdownText from '../MarkdownText';
import { useScroll } from '@/contexts/ScrollContext';
import AudioChat from '../AudioChat';

interface ProjectDetailProps {
  id?: string;
  title: string;
  subTitle: string;
  overview?: string;
  url?: string;
  imageUrl?: string;
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
  url,
  imageUrl,
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
  const [heightTooSmall, setHeightTooSmall] = useState(false);

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
          isDesktop: '(min-width: 1024px) and (max-aspect-ratio: 1999/849)',
          isMobile: '(max-width: 1023px), (min-aspect-ratio: 849/1999)',
        },
        (context) => {
          const { isDesktop } = context.conditions!;
          // console.log('isDesktop: ', isDesktop);

          if (isDesktop) {
            setHeightTooSmall(false);
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
            setHeightTooSmall(true);
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
      <div
        className={`absolute right-0 top-1/2 hidden h-[36%] -translate-y-1/2 ${
          heightTooSmall || 'lg:block'
        }`}
      >
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
      {/* <div className='absolute top-[calc(100%-16px)] left-1/2 hidden w-[240px] -translate-x-1/2 md:bottom-12 sm:block lg:hidden'>
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
      </div> */}
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col ${
        heightTooSmall || 'lg:flex-row'
      } min-h-screen bg-background text-foreground`}
    >
      {/* Left Pinned Sidebar */}
      <div
        ref={sidebarRef}
        className={`sticky top-[63px] w-[calc(100%+1px)] px-2 md:px-10 {xl:px-20} bg-background/90 backdrop-blur-md ${
          heightTooSmall || 'xl:w-[35%] lg:w-[40%] lg:pl-0 lg:bg-transparent'
        } z-10 h-max`}
      >
        <div
          className={`space-y-2 flex flex-col items-center justify-center text-center ${
            heightTooSmall ||
            'lg:max-w-xl lg:space-y-8 lg:h-[calc(100dvh-64px)]'
          } h-max px-4 pt-6 pb-8`}
        >
          <TimelineIndicator />
          <h1
            className={`text-2xl md:text-4xl font-semibold ${
              heightTooSmall || 'lg:text-[3.5dvw]'
            }`}
          >
            <MarkdownText>{title}</MarkdownText>
          </h1>
          <div
            className={`text-zinc-400 sm:text-xl ${
              heightTooSmall || 'lg:text-[2dvw]'
            }`}
          >
            <MarkdownText>{subTitle}</MarkdownText>
          </div>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className={`inline-flex items-center gap-2 bg-white/10 rounded-full py-2 px-4 ${
                heightTooSmall || 'lg:py-3 lg:px-6'
              } hover:bg-white/20 transition-colors `}
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
        className={`w-full md:px-10 {xl:px-20} py-10  ${
          heightTooSmall
            ? 'space-y-2 lg:flex-1 lg:px-0 lg:py-20'
            : 'space-y-2 px-2 lg:pr-0'
        } max-lg:space-y-2`}
      >
        {/* Header Visual */}
        <div
          id='header-visual'
          className={`w-full h-max ${
            heightTooSmall || 'lg:h-[calc(100dvh-72px)]'
          } flex items-center justify-center overflow-hidden`}
        >
          <div className='relative w-full !min-h-max  rounded-3xl overflow-hidden'>
            <Image
              src={imageUrl!}
              alt='Header visual'
              width={1000}
              height={1000}
              className='max-w-full max-h-full'
            />
          </div>
        </div>

        {/* Problem Section */}
        <div
          id='problem-section'
          className={`w-full h-max ${
            heightTooSmall || 'lg:h-[calc(100dvh-72px)] w-full'
          } flex items-center justify-center overflow-hidden`}
        >
          <div className='bg-foreground text-background rounded-3xl p-8 space-y-6 w-full'>
            <h2
              className={`text-3xl ${
                heightTooSmall || 'lg:text-[2dvw]'
              } font-bold`}
            >
              <MarkdownText>{problemTitle}</MarkdownText>
            </h2>
            {problemOverview && (
              <div
                className={`text-lg ${heightTooSmall || 'lg:text-[1.2dvw]'}`}
              >
                <MarkdownText>{problemOverview}</MarkdownText>
              </div>
            )}
            <ul className='space-y-4 pl-6 list-disc'>
              {problems.map((item, idx) => (
                <li
                  key={idx}
                  className={`text-lg ${
                    heightTooSmall || 'lg:text-[1.175dvw]'
                  }`}
                >
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
          className={`w-full h-max ${
            heightTooSmall || 'lg:h-[calc(100dvh-72px)] w-full'
          } flex items-center justify-center overflow-hidden`}
        >
          <div className='bg-bright-yellow text-background rounded-3xl p-8 space-y-6 w-full'>
            <h2
              className={`text-3xl font-bold ${
                heightTooSmall || 'lg:text-[2dvw]'
              }`}
            >
              <MarkdownText>{solutionTitle}</MarkdownText>
            </h2>
            {solutionOverview && (
              <div
                className={`text-lg ${heightTooSmall || 'lg:text-[1.2dvw]'}`}
              >
                <MarkdownText>{solutionOverview}</MarkdownText>
              </div>
            )}
            <ul className='space-y-4 pl-6 list-disc'>
              {solutions.map((item, idx) => (
                <li
                  key={idx}
                  className={`text-lg ${
                    heightTooSmall || 'lg:text-[1.175dvw]'
                  }`}
                >
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
            {id === 'smart-plab-assistant' ? (
              <AudioChat
                assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID} // Replace with your actual Vapi assistant ID
                chatTitle='Talk to Robert'
                chatOverview='Experience our solution firsthand with a live conversation'
              />
            ) : (
              <>
                <div
                  id='video-section'
                  className={`w-full h-max ${
                    heightTooSmall || 'lg:h-[calc(100dvh-72px)]'
                  } flex items-center justify-center overflow-hidden`}
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
                      {id === 'lean-architect' ? (
                        <video
                          className='w-full h-full'
                          src={videoUrl}
                          controls
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <iframe
                          className='w-full h-full'
                          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                          allowFullScreen
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Hidden Spacer Div */}
            <div
              className={`max-lg:hidden aspect-video rounded-2xl overflow-hidden ${
                heightTooSmall && 'hidden'
              }`}
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
