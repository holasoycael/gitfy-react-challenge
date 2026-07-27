// heroui
import { Skeleton } from '@heroui/skeleton'

const SearchUserSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-2" data-testid="search-user__skeleton">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-3 px-3 py-2">
          <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
          <Skeleton className="h-4 w-32 rounded-md bg-white/10" />
        </div>
      ))}
    </div>
  )
}

export default SearchUserSkeleton
