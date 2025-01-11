import db from '@/db'

interface MenuNode {
  id: number
  name: string
  depth: number
  parentId: number | null
  children: MenuNode[]
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
