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
import { editFormSchema, EditFormData, MenuNode } from '@/types'
import { useAppDispatch } from '@/lib/redux/hooks'
import { useEffect } from 'react'
import { updateNode } from '@/actions'
import { setFormError } from '@/lib/redux/slices/formSlice'
import { setMenuTree } from '@/lib/redux/slices/menuSlice'

export default function EditForm({ node }: { node: MenuNode | undefined }) {
  const dispatch = useAppDispatch()
  const form = useForm<EditFormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      menuId: node?.id?.toString() || 'ID',
      depth: node?.depth?.toString() || '0',
      name: node?.name || 'Name',
    },
  })

  const {
    reset,
    formState: { isSubmitting },
  } = form
  useEffect(() => {
    if (node) {
      reset({
        menuId: node.id?.toString() || 'ID',
        depth: node.depth?.toString() || '0',
        name: node?.name || 'Name',
      })
    }
  }, [node, reset])

  async function onSubmit(formData: EditFormData) {
    try {
      const { data, error } = await updateNode(formData)
      if (error) {
        dispatch(setFormError(error))
        reset()
        return
      }
      dispatch(setMenuTree(data))
    } catch (error) {
      console.error('Error submitting form:', error)
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
