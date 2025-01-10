'use client'

import EditForm from '@/components/EditForm'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import AddForm from './AddForm'
import { useEffect } from 'react'
import { setAddForm, setUpdateForm } from '@/lib/redux/slices/formSlice'

export default function FormWrapper() {
  const dispatch = useAppDispatch()
  const menuTree = useAppSelector((state) => state.menu.menuTree)
  const showUpdateForm = useAppSelector((state) => state.form.updateForm)
  const showAddForm = useAppSelector((state) => state.form.addForm)
  const node = useAppSelector((state) => state.form.node)

  useEffect(() => {
    dispatch(setAddForm(false))
    dispatch(setUpdateForm(false))
  }, [menuTree])

  if (!showAddForm && !showUpdateForm) return

  return (
    <>
      {showAddForm && <AddForm node={node} />}
      {showUpdateForm && <EditForm node={node} />}
    </>
  )
}
