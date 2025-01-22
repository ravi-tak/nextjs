'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setMenuTree } from '@/lib/redux/slices/menuSlice'
import MenuTree from './MenuTree'
import addIcon from '../../public/add-icon.svg'
import { setAddForm } from '@/lib/redux/slices/formSlice'
import Image from 'next/image'
import { MenuNode } from '@/types'
import Collapse from './Collapse'

export default function MenuWrapper({ node }: { node: MenuNode | null }) {
  const rootNode = useAppSelector((state) => state.menu.menuTree)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMenuTree(node))
  }, [node, dispatch])

  if (!rootNode)
    return (
      <>
        <button
          className='w-fit'
          onClick={() => dispatch(setAddForm(true))}
        >
          <Image
            src={addIcon}
            alt='Add Iocn'
            height={20}
          />
        </button>
      </>
    )

  return (
    <>
      <Collapse />
      <MenuTree node={rootNode} />
    </>
  )
}
