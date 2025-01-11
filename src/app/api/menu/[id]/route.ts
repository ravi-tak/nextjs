import { type NextRequest, NextResponse } from 'next/server'
import db from '@/db'
import { fetchMenuTree } from '../utils'

// Update and pass name in search query
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json(
      { message: 'name query required' },
      { status: 400 }
    )
  }

  try {
    const updatedNode = await db.menuNode.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    })
    if (updatedNode) {
      const result = await fetchMenuTree()
      return NextResponse.json(result)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

// Delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  try {
    await db.menuNode.delete({
      where: { id: parseInt(id, 10) },
    })

    const result = await fetchMenuTree()
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
