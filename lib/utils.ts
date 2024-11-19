import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function groupItems<T>(data: T[], groupSize: number): T[][] {
  const groupedArray: T[][] = [];

  for (let i = 0; i < data.length; i += groupSize) {
    groupedArray.push(data.slice(i, i + groupSize));
  }

  return groupedArray;
}

export { cn, groupItems };
