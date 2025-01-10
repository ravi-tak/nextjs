'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setShowAllMenu } from '@/lib/redux/slices/menuSlice'
import { setAddForm, setUpdateForm } from '@/lib/redux/slices/formSlice'

export default function Collapse() {
  const dispatch = useAppDispatch()
  const menuTree = useAppSelector((state) => state.menu.menuTree)
  const showAllMenu = useAppSelector((state) => state.menu.showAllMenu)

  if (!menuTree) return

  function closeAllForm() {
    dispatch(setUpdateForm(false))
    dispatch(setAddForm(false))
  }

  return (
    <div className='flex gap-4 text-xs'>
      <Button
        onClick={() => {
          dispatch(setShowAllMenu(true))
          closeAllForm()
        }}
        className={`${
          showAllMenu
            ? 'pointer-events-none !bg-blue-1 text-white'
            : 'hover:bg-blue-1 hover:text-white'
        } border border-gray-1 inner-padding rounded-full py-2 px-4 sm:px-8 bg-gray-3`}
      >
        Expand All
      </Button>
      <Button
        onClick={() => {
          dispatch(setShowAllMenu(false))
          closeAllForm()
        }}
        className={`${
          !showAllMenu
            ? 'pointer-events-none !bg-blue-1 text-white'
            : 'hover:bg-blue-1 hover:text-white'
        } border border-gray-1 inner-padding rounded-full py-2 px-4 sm:px-8 bg-gray-3`}
      >
        Collapse All
      </Button>
    </div>
  )
}
