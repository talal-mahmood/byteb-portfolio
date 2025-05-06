'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// import { FocusOn } from 'react-focus-on'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subTitle: string;
  overview: string;
  problem: string;
  solution: string;
  efficiency: number;
  image: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  subTitle,
  overview,
  problem,
  solution,
  efficiency,
  image,
}: ModalProps) => {
  const handleWheelAndTouch = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // <FocusOn
        //   onEscapeKey={onClose}
        //   onClickOutside={onClose}
        //   returnFocus={true}
        // >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] overflow-y-auto'
          onClick={onClose}
          onWheel={handleWheelAndTouch}
          onTouchMove={handleWheelAndTouch}
          onScroll={handleScroll}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed top-8 right-8 z-[70] bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors'
          >
            <X className='w-6 h-6' />
          </motion.button>

          {/* Modal Container - Centered with padding */}
          <div className='min-h-screen px-4 py-20 flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className='w-full max-w-[800px] z-[70]'
              onClick={handleModalClick}
            >
              <div className='grid md:grid-cols-[1fr,1.2fr] gap-12'>
                {/* Left Column */}
                <div className='space-y-8'>
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-2xl font-bold mb-2'
                    >
                      {title.trim()}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1 } }}
                      className='text-lg text-white/60'
                    >
                      {subTitle?.toLowerCase().trim()}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className='flex items-center gap-4'
                  >
                    <div>
                      <div className='text-2xl font-bold mb-2'>
                        ~{efficiency}%
                      </div>
                      <div className='text-white/60'>
                        Time and resource savings
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className='space-y-8'>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    className='text-lg text-white/80 leading-relaxed'
                  >
                    {overview}
                  </motion.p>

                  <div className='space-y-6'>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.4 } }}
                      className='text-lg font-semibold text-white/90'
                    >
                      Problem
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.5 } }}
                      className='space-y-4 text-white/70'
                    >
                      {problem}
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.6 } }}
                      className='text-lg font-semibold text-white/90'
                    >
                      Solution
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.7 } }}
                      className='space-y-4 text-white/70'
                    >
                      {solution}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        // </FocusOn>
      )}
    </AnimatePresence>
  );
};
