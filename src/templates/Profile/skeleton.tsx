// heroui
import { Card } from '@heroui/react'
import { Skeleton } from '@heroui/react'

const SkeletonProfile = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start" data-testid="profile__skeleton">
      <Card
        className="bg-black/40 backdrop-blur-md border border-white/10 p-4 space-y-4 shadow-2xl rounded-2xl"
        data-testid="profile__skeleton-card"
      >
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <Skeleton className="rounded-full w-20 h-20 shrink-0" />
          <div className="flex flex-col items-center space-y-2 w-full">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-full max-w-48 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2" data-testid="profile__skeleton-stats">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <Skeleton className="h-3 w-36 rounded-lg" />
          <Skeleton className="h-3 w-28 rounded-lg" />
          <Skeleton className="h-3 w-40 rounded-lg" />
        </div>

        <Skeleton className="h-8 w-full rounded-lg" />
      </Card>

      <Card
        className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
        data-testid="profile__skeleton-repos"
      >
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <Skeleton className="h-4 w-28 rounded-lg" />
          <Skeleton className="h-7 w-36 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 p-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-lg w-full" />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default SkeletonProfile
