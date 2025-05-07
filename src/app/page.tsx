'use client';

import { PROJECT_DATA } from '@/constants/projects';
import { HeroSection } from '@/components/main/HeroSection';
import ProjectDetail from '@/components/projects/ProjectDetail';
// import { ProjectsSection } from '@/components/main/ProjectsSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      {/* <ProjectsSection /> */}

      {PROJECT_DATA.map((entry) => (
        <div key={entry.id}>
          <ProjectDetail
            id={entry.id}
            title={entry.title}
            subTitle={entry.subTitle}
            overview={entry.overview}
            url={entry.url}
            videoUrl={entry.videoUrl}
            problems={entry.problems}
            // problemImage={entry.problemImage || ''}
            problemTitle='Problem'
            problemOverview={entry.problemOverview}
            solutions={entry.solutions}
            // solutionImage={entry.solutionImage || ''}
            solutionTitle='Solution'
            solutionOverview={entry.solutionOverview}
          />
          <div className='relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-20 py-10 space-y-8'>
            {/* Back link */}
            {/* <Link
          href={`/project/${params.project}`}
          className='self-start flex gap-1 font-semibold mb-4 bg-white text-black rounded-full px-3 py-2 cursor-pointer hover:opacity-90 top-40 sticky'
        >
          <ChevronLeft className='-ml-2' /> Back
        </Link> */}

            {/* Heading & Description */}
            <div className='text-center max-w-3xl'>
              <h1 className='text-4xl font-bold mb-2'>
                {/* {entry.title} */}
                Demo
              </h1>
              {entry.overview && (
                <p className='text-zinc-400 text-lg'>{entry.overview}</p>
              )}
            </div>

            {/* Video player */}
            {/* <video
        src={entry.videoUrl}
        poster={entry.videoThumbnail}
        controls
        autoPlay
        className='w-full max-w-4xl rounded-2xl shadow-2xl'
      /> */}
            <iframe
              className='h-[512px] w-full max-w-4xl rounded-2xl shadow-2xl'
              src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
