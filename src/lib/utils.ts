import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodIssue } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export function serializeZodIssue(errors: ZodIssue[]) {
  return errors.reduce((acc: { [key: string]: string }, error) => {
    acc[error.path[0]] = error.message
    return acc
  }, {})
}
