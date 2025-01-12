import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const baseURL =
//   process.env.VERCEL_ENV === 'production'
//     ? `https://${process.env.VERCEL_URL || 'https://tree-view-itrofc8iu-ravi-taks-projects.vercel.app'}`
//     : 'http://localhost:3000'

export const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
