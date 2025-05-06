'use client';

import { useState } from 'react';
import { AlignJustify, LogOut, Settings } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`bg-foreground text-background top-0 bottom-0 transition-all duration-300 ${
        !isOpen ? 'w-[64px]' : 'w-64'
      } absolute`}
    >
      <div className='w-full h-full flex flex-col justify-between bg-pink-700'>
        <div
          className={`h-max bg-orange-500 flex flex-col ${
            isOpen ? 'px-4' : 'items-center'
          }`}
        >
          <button onClick={toggleSideBar} className='cursor-pointer'>
            <AlignJustify className='w-8 h-8' />
          </button>
          {isOpen && (
            <div className='flex flex-col gap-2 text-xl pt-4 '>
              {/* <h1 className='text-xl'>Contents</h1> */}
              <a href='/voting' className='!text-background'>
                Voting
              </a>
              <a href='/result' className='!text-background'>
                Result
              </a>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center gap-3 justify-between px-1 pb-2 h-max bg-green-500'>
          {/* <Settings className='h-6 w-6' /> */}
          <LogOut className='h-6 w-6' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
