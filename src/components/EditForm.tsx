'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Node } from '@/types'
import { useAppDispatch } from '@/lib/redux/hooks'
import { updateMenuAsync } from '@/lib/redux/slices/menuSlice'
import { useEffect } from 'react'

const formSchema = z.object({
  menuId: z.string(),
  depth: z.string(),
  name: z.string().min(1, { message: 'Name must be present.' }),
})

export default function EditForm({ node }: { node: Node | undefined }) {
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuId: node?.id?.toString() || 'ID',
      depth: node?.depth?.toString() || '0',
      name: node?.name || 'Name',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const { reset } = form
  useEffect(() => {
    if (node) {
      reset({
        menuId: node.id?.toString() || 'ID',
        depth: node.depth?.toString() || '0',
        name: node?.name || 'Name',
      })
    }
  }, [node, reset])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(updateMenuAsync({ id: values.menuId, name: values.name }))
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='text-xs flex flex-col gap-3 w-full'
      >
        <FormField
          control={form.control}
          name='menuId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu ID</FormLabel>
              <FormControl>
                <Input
                  className={'opacity-50'}
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='depth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depth</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  className={'opacity-50'}
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='input-padding text-sm rounded-full bg-blue-5 w-full sm:w-[60%] text-white bg-blue-3'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading' : 'Update'}
        </Button>
      </form>
    </Form>
  )
}
