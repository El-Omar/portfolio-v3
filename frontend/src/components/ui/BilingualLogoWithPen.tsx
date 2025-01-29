import BilingualLogo from "./BilingualLogo";
import IconPen from "@/components/assets/pen.svg";

const BilingualLogoWithPen = () => {
  return (
    <div className="flex items-center gap-2">
      <BilingualLogo />
      <IconPen className="dark:fill-neutral-100" />
    </div>
  );
};

export default BilingualLogoWithPen;
