import { ReactNode } from "react";

export type TestimonialType = {
  review: ReactNode;
  author: string;
  image: string;
  role: string;
  gradient?: "green" | "red";
};
