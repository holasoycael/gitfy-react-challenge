import SimpleBar from 'simplebar-react'

// heroui
import { DrawerHeader } from '@heroui/react'
import { DrawerBody } from '@heroui/react'
import { DrawerFooter } from '@heroui/react'

// icons lucide
import { Users as IconUsers } from 'lucide-react'

const SkeletonUsersDrawer = () => {
  return (
    <>
      <DrawerHeader
        className="flex flex-col gap-1 border-b border-white/10 p-4"
        data-testid="users-drawer__skeleton-header"
      >
        <div className="flex items-center gap-2.5">
          <IconUsers className="text-white/20" size={20} strokeWidth={1} />
          <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
        </div>
      </DrawerHeader>

      <DrawerBody className="p-0 overflow-hidden" data-testid="users-drawer__skeleton-body">
        <SimpleBar className="h-full max-h-[calc(100vh-140px)] p-4">
          <div className="flex flex-col gap-2.5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 animate-pulse"
                data-testid="users-drawer__item-skeleton"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="h-3 bg-white/10 rounded w-28" />
                    <div className="h-2 bg-white/10 rounded w-16" />
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-7 h-7 bg-white/10 rounded-md" />
                  <div className="w-7 h-7 bg-white/10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </DrawerBody>

      <DrawerFooter
        className="border-t border-white/10 flex items-center justify-between p-4 bg-black/20"
        data-testid="users-drawer__skeleton-footer"
      >
        <div className="h-3 bg-white/10 rounded w-16 animate-pulse" />
        <div className="h-7 bg-white/10 rounded w-24 animate-pulse" />
      </DrawerFooter>
    </>
  )
}

export default SkeletonUsersDrawer
