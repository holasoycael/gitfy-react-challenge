// heroui
import { Skeleton } from '@heroui/react'

const SkeletonRepoList = () => {
  return (
    <div className="w-full flex flex-col" data-testid="repo-list__skeleton">
      <div className="w-full flex items-center justify-between pb-4 border-b border-white/8 h-7">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-3 w-8 rounded-md" />
        </div>
        <Skeleton className="h-7 w-36 rounded-md" />
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="py-5 border-b border-white/8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-3.5 w-full max-w-md rounded-md" />
            <div className="flex items-center gap-3 mt-1">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-3 w-12 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-5 w-12 rounded-full shrink-0 mt-0.5" />
        </div>
      ))}
    </div>
  )
}

export default SkeletonRepoList
