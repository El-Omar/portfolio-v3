import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("container px-5 md:px-8 xl:px-10", className)}>
      {children}
    </div>
  );
};

export default Container;
