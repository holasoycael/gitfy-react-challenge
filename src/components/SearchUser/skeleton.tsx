// heroui
import { Skeleton } from '@heroui/skeleton'

const SearchUserSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 p-0.5" data-testid="search-user__skeleton">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5">
          <Skeleton className="h-6 w-6 rounded-full bg-white/10 shrink-0" />
          <Skeleton className="h-3 w-28 rounded-md bg-white/10" />
        </div>
      ))}
    </div>
  )
}

export default SearchUserSkeleton
