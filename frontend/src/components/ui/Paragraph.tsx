import { ComponentProps, ReactElement, ReactNode } from "react";

type Props = ComponentProps<"p"> & {
  children?: ReactNode;
};

const Paragraph = ({ className, ...props }: Props): ReactElement => {
  return (
    <p
      className={`lg:w-[470px] md:w-96 md:max-w-full max-w-96 w-full ml-1 text-sm md:text-base leading-relaxed ${className}`}
      {...props}
    >
      {props.children}
    </p>
  );
};

export default Paragraph;
