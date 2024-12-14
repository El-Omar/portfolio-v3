"use client";

import {
  Children,
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import debounce from "@/lib/utils/debounce";

type WrappedItem = {
  key: string;
  content: ReactNode;
};

type Props = {
  children: ReactNode;
};

const MasonryLayout = ({ children }: Props): JSX.Element => {
  const [columns, setColumns] = useState<number>(2);

  useEffect(() => {
    const updateColumns = (): void => {
      if (window.innerWidth < 1024) setColumns(1);
      else setColumns(2);
    };

    updateColumns();
    const debouncedResize = debounce(updateColumns, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const distributeItems = useMemo((): WrappedItem[][] => {
    // Convert children to array and ensure each child has a stable key
    const childrenArray: WrappedItem[] = Children.toArray(children).map(
      (child, index) => ({
        key: `item-${index}`,
        content: child,
      }),
    );

    if (columns === 1) {
      return [childrenArray];
    }

    const columnArrays: WrappedItem[][] = Array.from(
      { length: columns },
      () => [],
    );

    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(child);
    });

    return columnArrays;
  }, [children, columns]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-8">
        {distributeItems.map((column, columnIndex) => (
          <div
            key={`column-${columnIndex}`}
            className="flex-1 flex flex-col gap-8 min-w-[300px] max-w-[600px]"
          >
            {column.map(({ key, content }) => (
              <Fragment key={key}>{content}</Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryLayout;
