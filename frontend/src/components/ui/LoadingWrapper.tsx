import { LoaderPinwheel } from "lucide-react";

const LoadingWrapper = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  return (
    <span className="flex items-center gap-2 relative">
      {isLoading && (
        <LoaderPinwheel className="h-4 w-4 animate-spin absolute left-[calc(50%_-_0.5rem)]" />
      )}
      <span className={isLoading ? "opacity-0" : ""}>{children}</span>
    </span>
  );
};

export default LoadingWrapper;
