import Image from "next/image";
import { ReactElement } from "react";

const BilingualLogo = (): ReactElement => {
  return (
    <figure
      className="flex items-center rtl:flex-row-reverse rtl:justify-end
        text-neutral-900 dark:text-neutral-50"
    >
      <strong className="text-xl font-rakkas mt-5 -mr-1 leading-[0]">
        ـمر
      </strong>
      <Image
        src="/img/logo.svg"
        alt="Logo"
        width={28}
        height={28}
        className={`dark:invert`}
      />
      <span className="text-xl font-pacifico mt-0 -ml-1 leading-[0]">omar</span>
    </figure>
  );
};

export default BilingualLogo;
