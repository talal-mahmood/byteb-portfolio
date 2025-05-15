const Content = ({
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return <div className='h-full min-h-max w-full min-w-full'>{children}</div>;
};

export default Content;
