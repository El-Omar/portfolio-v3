import Image from "next/image";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  invert?: boolean;
  className?: string;
};

const BilingualLogo = ({ invert, className }: Props): ReactElement => {
  return (
    <figure
      className={twMerge(
        "flex items-center rtl:flex-row-reverse rtl:justify-end",
        invert ? "text-neutral-200" : "text-neutral-900",
        className,
      )}
    >
      <strong className="text-xl font-rakkas mt-5 -mr-1 leading-[0]">
        ـمر
      </strong>
      <Image
        src="/img/logo.svg"
        alt="Logo"
        width={28}
        height={28}
        className={`${invert ? "invert" : ""}`}
      />
      <span className="text-xl font-pacifico mt-0 -ml-1 leading-[0]">omar</span>
    </figure>
  );
};

export default BilingualLogo;
