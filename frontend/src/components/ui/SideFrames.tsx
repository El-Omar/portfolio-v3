import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SideFrames = ({ children }: Props): ReactElement => {
  return (
    <>
      <div className="fixed right-0 top-0 z-0 h-screen md:block hidden w-7 bg-white"></div>
      {children}
      <div className="fixed left-0 top-0 z-0 h-screen md:block hidden w-7 bg-white"></div>
    </>
  );
};

export default SideFrames;
