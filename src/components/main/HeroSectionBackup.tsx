'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function HeroSection() {
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true, amount: 0.3 });

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
      ref={heroRef}
      className='relative bg-background text-foreground flex flex-wrap items-center p-20 mt-[72px]'
    >
      {/* subtle gradient/background accent */}
      {/* <div className='absolute inset-0 bg-gradient-to-b from-[#000001] via-[#0a0a0a] to-[#000001]/80 pointer-events-none' /> */}

      <div className='relative max-w-1/2'>
        <motion.h1
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className='font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#fffffe]'
        >
          We Build Intuitive, Secure AI Solutions{' '}
          <br className='block sm:hidden' />
          for Ambitious Teams.
        </motion.h1>
        <motion.p
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className='mb-4 text-md sm:text-lg font-semibold bg-foreground text-background rounded-full py-1 px-2 w-max'
        >
          AI. Made Ethical. Designed Beautifully. Delivered Smartly.
        </motion.p>
        <motion.p
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className='mt-6 text-lg sm:text-xl font-light text-[#BEA6B0]'
        >
          From chatbots to automation and on-premise models, we craft AI that
          fits your business, protects your data, and accelerates your
          growth—with ethics and experience at the core.
        </motion.p>

        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className='mt-8 gap-4'
        >
          <motion.a
            href='https://calendly.com/muhammad-inam-f0mv/30min?month=2025-05'
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center gap-2 bg-bright-yellow text-background font-medium rounded-lg px-6 py-3'
          >
            Schedule a Call
          </motion.a>
        </motion.div>
      </div>
      <div className='w-full max-w-1/2'>
        <motion.h1
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className='font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight bg-white/10 p-10 rounded-4xl'
        >
          Our product development offers maximum value at minimum cost! We serve
          with our heart: Averaging a perfect satisfaction score as we not only
          develop, we educate. Valuing your products as our own, we save time by
          thinking ahead. Join us to bring your dreams to life!
        </motion.h1>
      </div>
    </section>
  );
}
