import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseURL =
  process.env.VERCEL_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
