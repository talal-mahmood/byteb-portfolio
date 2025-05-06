'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Link2 } from 'lucide-react';

interface ProjectDetailProps {
  id?: string;
  title: string;
  subTitle: string;
  overview?: string;
  url?: string;
  videoUrl?: string;
  // enriched problem/solution labels and intros
  problemTitle?: string;
  problemOverview?: string;
  problems?: string[];
  solutionTitle?: string;
  solutionOverview?: string;
  solutions?: string[];
  problemImage?: string;
  solutionImage?: string;
}

export default function ProjectDetail({
  id,
  title,
  subTitle,
  overview,
  url,
  videoUrl,
  problemTitle = 'Problem',
  problemOverview,
  problems = [],
  solutionTitle = 'Solution',
  solutionOverview,
  solutions = [],
  problemImage,
  solutionImage,
}: ProjectDetailProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className='px-20 py-10 {mt-[128px]} bg-background text-foreground'
    >
      {/* Title & SubTitle & Overview */}
      <motion.div
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className='max-w-3xl mx-auto text-center mb-12 space-y-4'
      >
        <h1 className='text-4xl md:text-5xl font-bold'>{title}</h1>
        <p className='text-zinc-400 text-lg md:text-xl'>{subTitle}</p>
        {/* {overview && (
          <p className='text-zinc-500 text-base md:text-lg'>{overview}</p>
        )} */}
        <div className='flex gap-2 items-center justify-center'>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className=' bg-white/10 rounded-full py-2 px-4 font-semibold inline-flex gap-2 hover:opacity-90'
            >
              <Link2 />
              Visit Project
            </a>
          )}
          {videoUrl && (
            <Link
              href={videoUrl}
              className=' bg-bright-yellow rounded-full py-2 px-4 text-background font-semibold hover:opacity-90'
            >
              ▶ Watch Video
            </Link>
          )}
        </div>
      </motion.div>

      {/* Two-Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
        {/* Problems Section */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
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
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
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
        </motion.div>
      </div>
    </section>
  );
}
