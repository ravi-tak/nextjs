import { NextResponse } from 'next/server'
import db from '@/db'

interface MenuNode {
  id: number
  name: string
  depth: number
  parentId: number | null
  children: MenuNode[]
}

// Get all menus
export async function GET() {
  try {
    const result = await fetchMenuTree()
    if (!result) {
      return NextResponse.json(
        { message: 'Root node not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the menu tree.' },
      { status: 500 }
    )
  }
}

// Add a node
export async function POST(req: Request) {
  try {
    const {
      name,
      depth,
      parentId,
    }: {
      name: string
      depth: number
      parentId: number | undefined
    } = await req.json()

    if (!name || typeof depth !== 'number') {
      return NextResponse.json(
        {
          message: 'missing fields',
        },
        { status: 200 }
      )
    }

    const newNode = await db.menuNode.create({
      data: {
        name,
        depth,
        parentId: parentId || null,
      },
    })

    if (newNode) {
      const result = await fetchMenuTree()
      return NextResponse.json(result)
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function fetchMenuTree() {
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
