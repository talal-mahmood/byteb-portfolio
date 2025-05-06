'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// import { Modal } from './Modal';
import { Brain, Building2, ShoppingBag, Truck } from 'lucide-react';
import { createElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROJECTS_DATA = [
  {
    title: 'Automated Legal Compliance Navigator',
    subTitle: 'AI-Powered Legal Advisory System for UK Regulations',
    overview:
      'Enterprise-grade legal assistance platform leveraging artificial intelligence to provide accurate, real-time legal guidance based on UK law precedents and current regulations',
    problem:
      'Small businesses and individuals face prohibitive costs and complexity when seeking legal counsel, often leading to non-compliance or costly mistakes in legal matters',
    solution:
      'Implementation of an AI-driven legal advisory system that processes over 1000 UK legal cases and current laws to deliver instant, accurate, and affordable legal guidance through a subscription-based SaaS platform',
    efficiency: 85,
    icon: Building2,
    image: '/projects/law.jpg',
    link: '/project/self-learning-tool',
  },
  {
    title: 'Social Media Content Optimization Engine',
    subTitle: 'AI-Enhanced Content Replication System',
    overview:
      'Advanced content analysis and generation platform that learns creator-specific patterns to produce personalized, trending content across major social media platforms',
    problem:
      'Content creators struggle to maintain consistent engagement and quality while keeping up with rapidly changing social media trends and audience expectations',
    solution:
      'Implementation of an AI system that analyzes successful content patterns, learns individual creator styles, and generates personalized content suggestions while maintaining brand authenticity',
    efficiency: 90,
    icon: ShoppingBag,
    image: '/projects/social.jpg',
    link: '/project/self-learning-tool',
  },
  {
    title: 'Personalized Learning Assistant Platform',
    subTitle: 'Curriculum-Aligned AI Tutoring System',
    overview:
      'Comprehensive educational support platform that provides personalized tutoring aligned with specific curriculum requirements while enabling parental oversight',
    problem:
      "Students need accessible, personalized academic support that aligns with their curriculum, while parents require transparency and oversight of their children's learning process",
    solution:
      'Development of an AI-powered tutoring system that provides curriculum-specific guidance while incorporating parental monitoring features and progress tracking capabilities',
    efficiency: 88,
    icon: Brain,
    image: '/projects/tutor.jpg',
    link: '/project/self-learning-tool',
  },
  {
    title: 'Architectural Compliance Validation Engine',
    subTitle: 'IBC Standards Automation Platform',
    overview:
      'Professional-grade architectural planning tool that automates compliance checking and complex calculations according to International Building Code standards',
    problem:
      'Architects face time-consuming manual processes for IBC compliance validation and complex structural calculations, increasing the risk of errors and project delays',
    solution:
      'Implementation of an AI-powered system that automatically validates architectural plans against IBC standards, performs complex calculations, and provides referenced regulatory guidance',
    efficiency: 92,
    icon: Building2,
    image: '/projects/architect.jpg',
    link: '/project/self-learning-tool',
  },
];

export const ProjectsSection = () => {
  const [selectedCase, setSelectedCase] = useState<
    (typeof PROJECTS_DATA)[0] | null
  >(null);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );

  return (
    <>
      <div className='px-20 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className='flex flex-col md:flex-row items-start justify-between mb-12 gap-4'
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            className='text-3xl md:text-5xl font-bold'
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-zinc-400 md:text-lg max-w-md'
          >
            Discover how our AI solutions transform different industries and
            drive business growth.
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
          {PROJECTS_DATA.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer'
              onClick={() => setSelectedCase(project)}
              onMouseEnter={() => setHoveredCase(project.title)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              <Link href={project.link}>
                <div className='flex h-full bg-white/10'>
                  <div className='w-1/2 md:w-2/5 py-8 pl-6 flex flex-col justify-between relative z-10'>
                    <div className='flex flex-col h-full'>
                      {/* Icon and Title Section */}
                      <div>
                        <motion.div
                          className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-700/30'
                          whileHover={{ scale: 1.05 }}
                        >
                          {createElement(project.icon, {
                            className: 'w-6 h-6 text-zinc-300',
                            strokeWidth: 1.5,
                          })}
                        </motion.div>
                      </div>

                      {/* Separator */}
                      <div className='w-full h-[1px] bg-white/20 my-6 ' />

                      {/* Title and Description */}
                      <div>
                        <h3 className='text-xl md:text-2xl pr-6 font-bold tracking-tight text-foreground mb-3'>
                          {project.title}
                        </h3>
                        <p className='text-zinc-400 pr-6 text-md leading-relaxed'>
                          {project.subTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='w-1/2 md:w-3/5 relative overflow-hidden'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        imageLoaded[project.title] ? 'opacity-100' : 'opacity-0'
                      } group-hover:scale-110`}
                      onLoad={() =>
                        setImageLoaded((prev) => ({
                          ...prev,
                          [project.title]: true,
                        }))
                      }
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent' />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <Modal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        overview={selectedCase?.overview || ''}
        title={selectedCase?.title || ''}
        subTitle={selectedCase?.subTitle || ''}
        problem={selectedCase?.problem || ''}
        solution={selectedCase?.solution || ''}
        efficiency={selectedCase?.efficiency || 0}
        image={selectedCase?.image || ''}
      /> */}
    </>
  );
};
