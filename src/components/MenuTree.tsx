'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import downArrow from '../../public/down-arrow.svg'
import addIcon from '../../public/add-icon.svg'
import editIcon from '../../public/edit-icon.svg'
import trashIcon from '../../public/trash-icon.svg'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  setAddForm,
  setNode,
  setUpdateForm,
} from '@/lib/redux/slices/formSlice'
import { Node } from '@/types'
import { deleteMenuAsync } from '@/lib/redux/slices/menuSlice'

export default function MenuTree({
  node,
  showLine = true,
}: {
  node: Node
  showLine?: boolean
}) {
  const dispatch = useAppDispatch()
  const showAllMenu = useAppSelector((state) => state.menu.showAllMenu)
  const [state, setState] = useState({
    open: showAllMenu,
    showIcons: false,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, open: showAllMenu }))
  }, [showAllMenu])

  function handleShowMenu() {
    setState((prev) => ({
      ...prev,
      open: !prev.open,
    }))
  }

  function mouseEvent(isEntering: boolean) {
    setState((prev) => ({
      ...prev,
      showIcons: isEntering,
    }))
  }

  return (
    <>
      <div className={`node ${showLine && node?.depth !== 0 ? 'line' : ''}`}>
        <div
          className={`${node?.children?.length ? 'cursor-pointer' : ''} ${
            node?.depth !== 0 ? 'line summary' : ''
          } title flex gap-2 items-center`}
          onMouseEnter={() => mouseEvent(true)}
          onMouseLeave={() => mouseEvent(false)}
        >
          <span
            onClick={handleShowMenu}
            className='flex gap-2 items-center'
          >
            {node?.children?.length ? (
              <Image
                src={downArrow}
                alt='title-icon'
                className={`${!state.open ? '-rotate-90' : ''} `}
              />
            ) : null}
            {node?.name}
          </span>

          {state.showIcons && (
            <>
              <button
                onClick={() => {
                  dispatch(setAddForm(true))
                  dispatch(setUpdateForm(false))
                  dispatch(setNode(node))
                }}
              >
                <Image
                  src={addIcon}
                  alt='Add Iocn'
                  height={20}
                />
              </button>
              <button
                onClick={() => {
                  dispatch(setUpdateForm(true))
                  dispatch(setAddForm(false))
                  dispatch(setNode(node))
                }}
              >
                <Image
                  src={editIcon}
                  alt='Add Iocn'
                  height={20}
                />
              </button>
              <button
                onClick={() => {
                  dispatch(deleteMenuAsync({ id: node?.id.toString() }))
                }}
              >
                <Image
                  src={trashIcon}
                  alt='trash Iocn'
                  height={20}
                />
              </button>
            </>
          )}
        </div>

        {state.open &&
          node?.children?.map((child, index) => (
            <MenuTree
              key={child.id}
              node={child}
              showLine={node?.children?.length - 1 !== index ? true : false}
            />
          ))}
      </div>
    </>
  )
}
