import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  variant?: "default" | "outline";
} & React.HTMLAttributes<HTMLSpanElement>;

const Badge = ({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded",
        variant === "default" &&
          "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        variant === "outline" &&
          "border border-neutral-200 dark:border-neutral-800",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
