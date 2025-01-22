'use server'

import db from '@/db'
import { serializeZodIssue } from '@/lib/utils'
import {
  AddFormData,
  addFormSchema,
  EditFormData,
  editFormSchema,
  FormError,
  MenuNode,
} from '@/types'

export async function getMenus() {
  try {
    const result = await fetchMenuTree()
    return result.rootNode
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while fetching the menu tree.')
  }
}

export async function addNode(formData: AddFormData): Promise<{
  error?: FormError
  data?: MenuNode | null
}> {
  try {
    const { name, depth, parentId } = formData
    const result = addFormSchema.safeParse(formData)
    if (!result.success) {
      const error = serializeZodIssue(result.error.errors)
      return { error }
    }
    await db.menuNode.create({
      data: {
        name,
        depth: parseInt(depth, 10),
        parentId: parentId ? parseInt(parentId, 10) : null,
      },
    })
    const res = await fetchMenuTree()
    return { data: res.rootNode }
  } catch (error) {
    console.log(error)
    return { error: 'Internal server error' }
  }
}

export async function updateNode(formData: EditFormData): Promise<{
  error?: FormError
  data?: MenuNode | null
}> {
  try {
    const { name, menuId } = formData
    const result = editFormSchema.safeParse(formData)
    if (!result.success) {
      const error = serializeZodIssue(result.error.errors)
      return { error }
    }
    await db.menuNode.update({
      where: { id: parseInt(menuId, 10) },
      data: { name },
    })
    const res = await fetchMenuTree()
    return { data: res.rootNode }
  } catch (error) {
    console.log(error)
    return { error: 'Internal server error' }
  }
}

export async function deleteNode(id: number): Promise<{
  error?: FormError
  data?: MenuNode | null
}> {
  try {
    await db.menuNode.delete({
      where: { id: id },
    })
    const res = await fetchMenuTree()
    return { data: res.rootNode }
  } catch (error) {
    console.log(error)
    return { error: 'Internal server error' }
  }
}

async function fetchMenuTree(): Promise<{ rootNode: MenuNode | null }> {
  const allNodes = await db.menuNode.findMany()
  const nodeMap = new Map<number, MenuNode>()
  let rootNode: MenuNode | null = null

  allNodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] })
  })

  allNodes.forEach((node) => {
    if (node.parentId) {
      const parent = nodeMap.get(node.parentId)
      parent?.children?.push(nodeMap.get(node.id)!)
    } else {
      rootNode = nodeMap.get(node.id)!
    }
  })

  return { rootNode }
}
