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
  columns?: {
    default: number;
    md?: number;
    lg?: number;
  };
  gap?: string;
  className?: string;
};

const MasonryLayout = ({ 
  children, 
  columns = { default: 1, md: 2, lg: 3 },
  gap = "gap-8",
  className = ""
}: Props): JSX.Element => {
  const [currentColumns, setCurrentColumns] = useState<number>(columns.default);

  // Generate grid columns classes based on the columns configuration
  const gridColumnsClass = useMemo(() => {
    // Always start with 1 column on mobile
    const baseClass = 'grid-cols-1';
    // Add medium and large breakpoint classes if specified
    const mdCols = columns.md ? `md:grid-cols-${columns.md}` : '';
    const lgCols = columns.lg ? `lg:grid-cols-${columns.lg}` : '';
    
    return `${baseClass} ${mdCols} ${lgCols}`.trim();
  }, [columns]);

  useEffect(() => {
    const updateColumns = (): void => {
      if (window.innerWidth >= 1024) {
        setCurrentColumns(columns.lg || columns.md || columns.default);
      } else if (window.innerWidth >= 768) {
        setCurrentColumns(columns.md || columns.default);
      } else {
        setCurrentColumns(1); // Always 1 column on mobile
      }
    };

    updateColumns();
    const debouncedResize = debounce(updateColumns, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [columns]);

  const distributeItems = useMemo((): WrappedItem[][] => {
    const childrenArray: WrappedItem[] = Children.toArray(children).map(
      (child, index) => ({
        key: `item-${index}`,
        content: child,
      }),
    );

    if (currentColumns === 1) {
      return [childrenArray];
    }

    const columnArrays: WrappedItem[][] = Array.from(
      { length: currentColumns },
      () => [],
    );

    childrenArray.forEach((child, index) => {
      const columnIndex = index % currentColumns;
      columnArrays[columnIndex].push(child);
    });

    return columnArrays;
  }, [children, currentColumns]);

  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className={`grid ${gridColumnsClass} ${gap}`}>
        {distributeItems.map((column, columnIndex) => (
          <div
            key={`column-${columnIndex}`}
            className={`flex flex-col ${gap}`}
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
