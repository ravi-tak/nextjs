export type Node = {
  id: number
  name: string
  depth: number
  parentId?: number | undefined
  children: Node[]
}
