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
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { addMenuAsync } from '@/lib/redux/slices/menuSlice'
import { useEffect } from 'react'

const formSchema = z.object({
  parentName: z.string(),
  depth: z.string(),
  name: z.string().min(1, { message: 'Name must be present.' }),
})

export default function AddForm({ node }: { node: Node | undefined }) {
  const dispatch = useAppDispatch()
  const menuTree = useAppSelector((state) => state.menu.menuTree)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      depth: node?.depth?.toString() || '0',
      parentName: node?.name || 'Root Node',
      name: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const { reset } = form
  useEffect(() => {
    if (node) {
      reset({
        depth: node.depth?.toString() || '0',
        parentName: node?.name,
        name: '',
      })
    }
  }, [node, reset])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(
        addMenuAsync({
          name: values.name,
          depth: menuTree
            ? parseInt(values.depth, 10) + 1
            : parseInt(values.depth, 10),
          parentId: node?.id ? node?.id : undefined,
        })
      )
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
          name='parentName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Name</FormLabel>
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
                <Input
                  placeholder='Name'
                  {...field}
                />
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
          {isSubmitting ? 'Loading' : 'Add'}
        </Button>
      </form>
    </Form>
  )
}
