'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { AddFormData, addFormSchema, MenuNode } from '@/types'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useEffect } from 'react'
import { addNode } from '@/actions'
import { setFormError } from '@/lib/redux/slices/formSlice'
import { setMenuTree } from '@/lib/redux/slices/menuSlice'

export default function AddForm({ node }: { node: MenuNode | undefined }) {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.form.error)
  const form = useForm<AddFormData>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      depth: node?.depth?.toString() || '0',
      parentName: node?.name || 'Root Node',
      parentId: node?.id.toString() || undefined,
      name: '',
    },
  })

  const {
    reset,
    formState: { isSubmitting },
  } = form
  useEffect(() => {
    if (node) {
      reset({
        depth: node.depth?.toString() || '0',
        parentName: node?.name,
        parentId: node?.id.toString() || undefined,
        name: '',
      })
    }
  }, [node, reset])

  async function onSubmit(formData: AddFormData) {
    try {
      const { data, error } = await addNode({
        ...formData,
        depth: node ? (parseInt(formData.depth, 10) + 1).toString() : '0',
        parentId: node?.id ? node?.id.toString() : undefined,
      })
      if (error) {
        dispatch(setFormError(error))
        reset()
        return
      }
      dispatch(setMenuTree(data))
    } catch (error) {
      console.log('Error submitting form:', error)
      throw new Error('Something went wrong')
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
          name='parentId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required={false}
                  className={'opacity-50'}
                  type='hidden'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {typeof error === 'string' && <FormMessage>{error}</FormMessage>}
      </form>
    </Form>
  )
}
