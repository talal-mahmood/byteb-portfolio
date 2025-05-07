'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full p-2 md:p-10 xl:p-20 h-[512px] bg-background text-foreground border-t border-white/10 max-md:text-center'>
      {/* Main Footer Content */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16'>
        {/* Company Info */}
        <div className='space-y-4 lg:max-w-xs max-md:flex flex-col items-center'>
          <h3 className='text-xl font-bold'>bytebricks</h3>
          <p className='text-zinc-400 text-sm leading-relaxed max-w-md'>
            Empowering businesses with state of the art Generative AI solutions
            for sustainable growth and innovation.
          </p>
          <div className='md:hidden w-full {flex} justify-center'>
            <motion.a
              href='https://calendly.com/muhammad-inam-f0mv/30min?month=2025-05'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#eaf337] justify-center rounded-lg text-background font-semibold gap-2 hover:bg-[#eaf337]/90 inline-flex items-center px-6 py-3 transition-colors m-auto'
            >
              Schedule a Call
              <ExternalLink className='ml-2 w-4 h-4' />
            </motion.a>
          </div>
        </div>

        {/* Contact Info */}
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold'>Contact</h3>
          <ul className='space-y-3 max-md:flex flex-col items-center'>
            <li className='flex items-center gap-2 text-zinc-400 text-sm'>
              <MapPin className='w-4 h-4' />
              <span>Karachi, Pakistan</span>
            </li>
            <li className='flex items-center gap-2.5 text-zinc-400 text-sm'>
              <Mail className='w-4 h-4' />
              <span>sales@byteb.io</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className='space-y-5 max-md:flex flex-col max-md:items-center'>
          <h3 className='text-lg font-semibold'>Follow Us</h3>
          <div className='flex max-md:items-center gap-4'>
            <motion.a
              href='https://twitter.com/wearebytebricks'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
              whileHover={{ y: -2 }}
            >
              <Twitter className='w-5 h-5' />
            </motion.a>
            <motion.a
              href='https://linkedin.com/company/byteb'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
              whileHover={{ y: -2 }}
            >
              <Linkedin className='w-5 h-5' />
            </motion.a>
          </div>
        </div>

        {/* Resources + CTA */}
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>Resources</h3>
            <ul className='mt-3 space-y-2 text-sm text-zinc-400'>
              <li>
                <a
                  href='https://byteb.io/docs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='https://byteb.io/blog'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='https://byteb.io/careers'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='max-md:hidden w-full {flex} justify-center'>
        <motion.a
          href='https://calendly.com/muhammad-inam-f0mv/30min?month=2025-05'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-[#eaf337] justify-center rounded-lg text-background font-semibold gap-2 hover:bg-[#eaf337]/90 inline-flex items-center px-6 py-3 transition-colors m-auto'
        >
          Schedule a Call
          <ExternalLink className='ml-2 w-4 h-4' />
        </motion.a>
      </div>

      {/* Bottom Bar */}
      <div className='pt-8 mt-8 border-t border-white/10'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
          <p className='text-zinc-400 text-sm'>
            © {currentYear} bytebricks. All rights reserved.
          </p>
          {/* <a
              href='https://byteb.io'
              target='_blank'
              rel='noopener noreferrer'
              className='text-zinc-400 text-sm hover:underline'
            >
              Visit our website ↗
            </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
