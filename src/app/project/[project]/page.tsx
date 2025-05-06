import ProjectDetail from '@/components/projects/ProjectDetail';
import { PROJECT_DATA } from '@/constants/projects';
import { notFound } from 'next/navigation';

const Project = ({ params }: { params: { project: string } }) => {
  const entry = PROJECT_DATA.find((p) => p.id === params.project);

  if (!entry) {
    // show Next.js 404
    notFound();
  }
  return (
    <>
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
    </>
  );
};

export default Project;
