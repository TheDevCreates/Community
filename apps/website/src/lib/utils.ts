import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nanoid(length = 10) {
  return customAlphabet(
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    length
  )();
}
