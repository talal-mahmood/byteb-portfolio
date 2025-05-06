import Link from 'next/link';
import { BytebricksLogo } from '../BytebricksLogo';

const Header = () => {
  return (
    <div className='flex items-center justify-between gap-4 bg-transparent w-full h-[64px] px-20 fixed top-10 left-0 right-0 z-10'>
      {/* {showModal && (
        <Modal
          title='Logout'
          description='Are you sure you want to logout?'
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            localStorage.removeItem('token');
            setShowModal(false);
            navigate('/login');
          }}
        />
      )} */}
      <Link
        // href='https://byteb.io/'
        href='/'
        className='p-4 backdrop-blur-md bg-white/15 rounded-4xl h-max'
      >
        <BytebricksLogo />
      </Link>
      <nav className='rounded-full max-w-full h-full w-max p-1 flex items-center justify-between backdrop-blur-md bg-white/15'>
        <div className='flex items-center gap-2'>
          {/* <h1 className='text-xl'>Contents</h1> */}
          <div className='flex items-center gap-2 font-semibold'>
            <Link
              href='/project/self-learning-tool'
              className='text-white hover:text-black px-6 py-4 rounded-full hover:bg-white/90'
            >
              Self Learning tool
            </Link>
            <Link
              href='/project/legal-analysis-agent'
              className='text-white hover:text-black px-6 py-4 rounded-full hover:bg-white/90'
            >
              Legal Analysis Agent
            </Link>
            <Link
              href='/project/agent-builder'
              className='text-white hover:text-black px-6 py-4 rounded-full hover:bg-white/90'
            >
              Agent builder
            </Link>
            <Link
              href='/project/lead-intelligence'
              className='text-white hover:text-black px-6 py-4 rounded-full hover:bg-white/90'
            >
              Lead Intelligence
            </Link>
            <Link
              href='/project/smart-plab-assistant'
              className='text-white hover:text-black px-6 py-4 rounded-full hover:bg-white/90'
            >
              Smart PLAB assistant
            </Link>
          </div>
        </div>
      </nav>
      {/* CTA Button */}
      <div className='flex items-center justify-center p-1 rounded-full backdrop-blur-md bg-white/15'>
        <a
          href='https://calendly.com/muhammad-inam-f0mv/30min'
          className='bg-white text-black px-6 py-4 font-bold rounded-full hover:bg-white/90 text-nowrap'
          target='_blank'
        >
          Let's Talk
        </a>
      </div>
    </div>
  );
};

export default Header;
