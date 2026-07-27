// heroui
import { Skeleton } from '@heroui/react'

const SkeletonMarkdownRenderer = () => {
  return (
    <div className="space-y-3 w-full" data-testid="markdown-renderer__skeleton">
      <Skeleton className="h-6 w-1/3 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-lg" />
      <Skeleton className="h-4 w-5/6 rounded-lg" />
      <Skeleton className="h-24 w-full rounded-xl mt-4" />
    </div>
  )
}

export default SkeletonMarkdownRenderer
