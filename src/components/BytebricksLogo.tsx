'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BytebricksLogo = () => {
  const pattern = [
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  // Get all valid box positions (where pattern[row][col] === 1)
  const getAllValidBoxes = () => {
    const validBoxes: string[] = [];
    pattern.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          validBoxes.push(`${rowIndex}-${colIndex}`);
        }
      });
    });
    return validBoxes;
  };

  // Get random boxes from valid positions
  const getRandomBoxes = (validBoxes: string[], count: number) => {
    const shuffled = [...validBoxes].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    return selected.reduce((acc, key) => ({ ...acc, [key]: true }), {});
  };

  const [activeBoxes, setActiveBoxes] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const validBoxes = getAllValidBoxes();

    const intervalId = setInterval(() => {
      const numBoxes = Math.floor(Math.random() * 3) + 1; // Random number between 2-4 boxes
      setActiveBoxes(getRandomBoxes(validBoxes, numBoxes));
    }, 900);

    return () => clearInterval(intervalId);
  }, []);

  const boxVariants = {
    initial: { opacity: 1 },
    animate: (isActive: boolean) => ({
      opacity: isActive ? 0 : 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative'>
        <div className='grid grid-rows-9 gap-[0.1rem]'>
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} className='flex gap-[0.1rem]'>
              {row.map((cell, cellIndex) =>
                cell ? (
                  <motion.div
                    key={`${rowIndex}-${cellIndex}`}
                    variants={boxVariants}
                    initial='initial'
                    animate='animate'
                    custom={activeBoxes[`${rowIndex}-${cellIndex}`]}
                    className='w-[0.2rem] h-[0.2rem] md:w-[0.25rem] md:h-[0.25rem] bg-white'
                  />
                ) : (
                  <div
                    key={`${rowIndex}-${cellIndex}`}
                    className='w-[0.2rem] h-[0.2rem] md:w-[0.25rem] md:h-[0.25rem]'
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='text-lg md:text-xl font-bold tracking-tight'>
        <span className='font-crossten font-bold'>bytebricks</span>
      </div>
    </div>
  );
};
