import { NextResponse } from 'next/server'
import db from '@/db'
import { fetchMenuTree } from './utils'

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
