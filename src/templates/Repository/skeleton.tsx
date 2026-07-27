// heroui
import { Skeleton } from '@heroui/react'

const SkeletonRepository = () => {
  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-[1fr_296px] gap-10 items-start"
      data-testid="repository__skeleton"
    >
      {/* Left Column: README Skeleton */}
      <div className="w-full space-y-4">
        <Skeleton className="h-5 w-28 rounded-lg" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>

      {/* Right Column: Sidebar Skeleton */}
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>
        <div className="space-y-2 pt-4 border-t border-white/8">
          <Skeleton className="h-4 w-24 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded-lg" />
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-white/8">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
        <div className="pt-4 border-t border-white/8">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonRepository
