// heroui
import { Skeleton } from '@heroui/react'

// components JSX
import SkeletonRepoList from 'components/RepoList/skeleton'

const SkeletonProfile = () => {
  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-10 items-start"
      data-testid="profile__skeleton"
    >
      {/* Left Sidebar Skeleton (ProfileCard) */}
      <aside className="sticky top-6 space-y-5">
        <Skeleton className="rounded-full w-65 h-65 shrink-0" />

        <div className="space-y-1">
          <Skeleton className="h-9.5 w-48 rounded-md" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-full max-w-56 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
          <Skeleton className="h-8 w-full rounded-md" />
        </div>

        <Skeleton className="h-5 w-44 rounded-md" />

        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      </aside>

      {/* Right Content Skeleton (RepoList) */}
      <SkeletonRepoList />
    </div>
  )
}

export default SkeletonProfile
