import { z } from 'zod'

export type MenuNode = {
  id: number
  name: string
  depth: number
  parentId?: number | null
  children: MenuNode[]
}

export const addFormSchema = z.object({
  parentName: z.string(),
  depth: z.string().refine((value) => !isNaN(parseInt(value, 10)), {
    message: 'Depth must be a valid number.',
  }),
  parentId: z
    .string()
    .refine((value) => !isNaN(parseInt(value, 10)), {
      message: 'Parent Id must be a valid number.',
    })
    .optional(),
  name: z.string().min(1, { message: 'Name must be present.' }),
})

export const editFormSchema = z.object({
  menuId: z.string().refine((value) => !isNaN(parseInt(value, 10)), {
    message: 'Menu Id must be a valid number.',
  }),
  depth: z.string().refine((value) => !isNaN(parseInt(value, 10)), {
    message: 'Depth must be a valid number.',
  }),
  name: z.string().min(1, { message: 'Name must be present.' }),
})

export type AddFormData = z.infer<typeof addFormSchema>

export type EditFormData = z.infer<typeof editFormSchema>

export type FormError = string | null | { [key: string]: string }
