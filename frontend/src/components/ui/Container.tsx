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
    <div className={twMerge("container px-5 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;