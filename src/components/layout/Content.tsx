// import Footer from "./Footer";

const Content = ({
  // show,
  children,
}: {
  // show: boolean;
  children: React.ReactNode;
}) => {
  return <main className='{h-full} min-h-max {w-full} min-w-full p-4'>{children}
  </main>;
};

export default Content;
