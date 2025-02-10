import Image from "next/image";
import { ReactElement } from "react";

const Logo = (): ReactElement => {
  return (
    <Image
      src="/img/logo.svg"
      alt="Logo"
      width={24}
      height={24}
      className="dark:invert"
    />
  );
};

export default Logo;
