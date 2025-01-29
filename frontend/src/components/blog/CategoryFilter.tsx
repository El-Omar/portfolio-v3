"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  categories: string[];
};

const CategoryFilter = ({ categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="overflow-x-auto pb-2 -mx-6 lg:mx-0">
      <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-2 px-6 lg:px-0 min-w-max">
        <li>
          <button
            onClick={() => handleCategoryClick(null)}
            className={cn(
              "hover:text-primary transition-colors whitespace-nowrap",
              !currentCategory ? "text-primary font-bold" : "text-neutral-600",
            )}
          >
            Latest
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "hover:text-primary transition-colors whitespace-nowrap",
                currentCategory === category
                  ? "text-primary font-bold"
                  : "text-neutral-600",
              )}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
