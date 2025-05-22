'use client';

import type React from 'react';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: '', hash: '#hero-section' },
  { label: 'Self Learning Tool', hash: '#self-learning-tool' },
  { label: 'Legal Analysis Agent', hash: '#legal-analysis-agent' },
  { label: 'Agent Builder', hash: '#agent-builder' },
  { label: 'Lean Architect', hash: '#lean-architect' },
  { label: 'Smart PLAB Assistant', hash: '#smart-plab-assistant' },
  // { label: '', hash: '#footer-section' },
];

const Header = () => {
  const lenis = useLenis();
  const drawerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sections = useRef<HTMLElement[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!navRef.current) return;

      // Grab your sections
      sections.current = NAV_ITEMS.map(
        ({ hash }) => document.querySelector(hash) as HTMLElement
      ).filter(Boolean);

      // Create a matchMedia context
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Desktop: width ≥ 1024px
        sections.current.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom top+=200%',
            end: 'top bottom+=200%',
            onEnter: () => setActiveHash(NAV_ITEMS[i]?.hash || ''),
            onEnterBack: () => setActiveHash(NAV_ITEMS[i - 1]?.hash || ''),
          });
        });
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile: width < 1024px
        sections.current.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom top+=200%',
            end: 'top bottom+=200%',
            onEnter: () => setActiveHash(NAV_ITEMS[i]?.hash || ''),
            onEnterBack: () => setActiveHash(NAV_ITEMS[i - 1]?.hash || ''),
          });
        });
      });

      // Cleanup on unmount
      return () => mm.revert();
    },
    { scope: headerRef }
  );

  // Handle drawer open/close
  function toggleDrawer() {
    if (!drawerRef.current) return;

    if (!drawerOpen) {
      // Open drawer
      gsap.set(drawerRef.current, { x: '100%', autoAlpha: 1, display: 'flex' });
      gsap.to(drawerRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power3.out',
      });
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Close drawer
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(drawerRef.current, { autoAlpha: 0, display: 'none' });
        },
      });
      // Restore body scrolling
      document.body.style.overflow = '';
    }

    setDrawerOpen(!drawerOpen);
  }

  // Smooth scroll to section using Lenis
  function handleClick(e: React.MouseEvent, hash: string) {
    e.preventDefault();
    const target = document.querySelector(hash);
    if (!target) return;

    // Calculate final scroll position (minus your header height)
    const headerOffset = 72;
    const extraOffset = 236;

    const top =
      (target as HTMLElement).getBoundingClientRect().top +
      window.scrollY -
      headerOffset +
      extraOffset;

    // Let Lenis do the smooth scrolling
    lenis?.scrollTo(top, {
      duration: 1,
      easing: (t) => t, // linear timing; tweak to taste
    });

    // Update URL & close drawer immediately
    window.history.pushState(null, '', hash);
    if (drawerOpen) toggleDrawer();
  }

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <div
        ref={drawerRef}
        className='fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-background/95 backdrop-blur-md z-50 flex flex-col shadow-2xl'
        style={{ display: 'none' }}
      >
        <div className='flex justify-between items-center p-6 border-b border-border/20'>
          <Image
            width={120}
            height={40}
            src='/portfolio/logo-text.png'
            alt='bytebricks'
            className='h-10 w-auto'
            priority
          />
          <button
            onClick={toggleDrawer}
            className='p-2 rounded-full hover:bg-foreground/10 transition-colors'
            aria-label='Close menu'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='flex-1 overflow-auto py-6'>
          <nav className='flex flex-col space-y-1 px-4'>
            {NAV_ITEMS.map(({ label, hash }, index) => (
              <Link
                key={hash}
                href={hash}
                ref={(el) => {
                  mobileNavRefs.current[index] = el;
                }}
                onClick={(e) => handleClick(e, hash)}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  index !== 0 && activeHash === hash
                    ? 'bg-foreground/10 font-medium'
                    : 'hover:bg-foreground/5'
                }`}
              >
                <span>{label}</span>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    index !== 0 && activeHash === hash
                      ? 'bg-bright-yellow'
                      : 'bg-transparent'
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className='p-6 border-t border-border/20'>
          <a
            href='https://calendly.com/muhammad-inam-f0mv/30min'
            className='flex items-center justify-center gap-2 w-full bg-foreground text-background py-3 px-6 rounded-lg font-semibold hover:bg-foreground/90 transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            Let&apos;s Talk
            <ExternalLink className='w-4 h-4' />
          </a>
        </div>
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 lg:max-w-[calc(85dvw+1px)] mx-auto transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md shadow-md py-3'
            : 'bg-background py-4'
        }`}
      >
        <div className='px-2 sm:px-4 lg:px-0 {12} flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              width={120}
              height={40}
              src='/portfolio/logo-text.png'
              alt='bytebricks'
              className='h-8 sm:h-10 w-auto lg:h-auto lg:w-[12dvw]'
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='relative hidden lg:flex items-center' ref={navRef}>
            <div className='flex text-nowrap gap-x-6'>
              {NAV_ITEMS.map(({ label, hash }, index) => (
                <Link
                  key={hash}
                  href={hash}
                  onClick={(e) => handleClick(e, hash)}
                  className={`{p-2} rounded-lg text-sm font-medium transition-colors hover:text-white/80 lg:text-[1.04dvw] flex items-center gap-2 {activeHash === hash ? 'bg-foreground/10 font-medium' : ''} ${
                    index === 0 && 'hidden p-0 m-0'
                  }
                  `}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      index !== 0 && activeHash === hash
                        ? 'bg-bright-yellow'
                        : 'bg-transparent'
                    }`}
                  />
                  <span>{label}</span>
                  {/* <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeHash === hash
                        ? 'bg-bright-yellow'
                        : 'bg-transparent'
                    }`}
                  /> */}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className='flex items-center'>
            <a
              href='https://calendly.com/muhammad-inam-f0mv/30min'
              className='bg-foreground text-background px-5 py-2 rounded-lg text-sm font-semibold hover:bg-foreground/90 transition-colors whitespace-nowrap'
              target='_blank'
              rel='noopener noreferrer'
            >
              Let&apos;s Talk
            </a>

            <button
              onClick={toggleDrawer}
              className='lg:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors'
              aria-label='Open menu'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm'
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Header;
