import { ReactElement } from "react";
import { Button } from "../ui/Button";
import BilingualLogo from "../ui/BilingualLogo";

import IconDark from "@/components/assets/dark.svg";

const Navigation = (): ReactElement => {
  const navToggleClassName =
    "bg-primary group-hover:w-[23px] transition-all duration-150 ease-in-out";

  return (
    <nav className="h-9 bg-white z-10 relative flex justify-between items-center">
      <Button
        variant="link"
        className="flex flex-col gap-1 items-start group -mb-6 ml-1"
      >
        <div className={`w-[21px] h-[3px] ${navToggleClassName}`}></div>
        <div className={`w-[18px] h-[3px] ${navToggleClassName}`}></div>
        <div className={`w-[19px] h-[3px] ${navToggleClassName}`}></div>
      </Button>
      <span className="-mb-4">
        <BilingualLogo />
      </span>
      <Button
        className="w-6 h-6 p-4 rounded-full bg-white border-none mr-3 mt-5 group hover:bg-gray-200"
        variant="outline"
      >
        <IconDark className="fill-primary scale-75" />
      </Button>
    </nav>
  );
};

export default Navigation;
