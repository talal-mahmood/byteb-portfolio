import Footer from "./Footer";

const Content = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <main className='flex flex-col w-full min-w-full p-4'>
       {children}
      {show && <Footer />}
    </main>
  );
};

export default Content;
