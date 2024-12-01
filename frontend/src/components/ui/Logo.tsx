import Image from "next/image";
import { ReactElement } from "react";

const Logo = (): ReactElement => {
  return (
    <Image
      src="/img/logo@2x.png"
      alt="Logo"
      width={24.75}
      height={24.245}
      className="dark:invert"
    />
  );
};

export default Logo;
