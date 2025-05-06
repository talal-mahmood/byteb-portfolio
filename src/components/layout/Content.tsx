const Content = ({
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return <div className='h-full min-h-max w-100%'>{children}</div>;
};

export default Content;
