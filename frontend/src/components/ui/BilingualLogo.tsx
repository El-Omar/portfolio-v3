import Image from "next/image";
import { ReactElement } from "react";

const BilingualLogo = (): ReactElement => {
  return (
    <figure className="flex items-center">
      <strong className="text-2xl font-rakkas mt-6 -mr-0.5">ـمر</strong>
      <Image
        src="/img/logo@2x.png"
        alt="Logo"
        width={24.75}
        height={24.245}
        className="dark:invert"
      />
      <span className="text-2xl font-pacifico mt-0 -ml-0.5">omar</span>
    </figure>
  );
};

export default BilingualLogo;
