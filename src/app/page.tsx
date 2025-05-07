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
        <div key={entry.id} id={entry.id}>
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
        </div>
      ))}
    </>
  );
};

export default Home;
