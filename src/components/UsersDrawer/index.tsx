'use client'

// heroui
import { Drawer } from '@heroui/react'
import { DrawerContent } from '@heroui/react'

// components JSX
import DataFetch from './fetch'

// types and interfaces
import type { UsersDrawerProps } from './types'

const UsersDrawer = ({ isOpen, onOpenChange }: UsersDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      size="md"
      data-testid="users-drawer"
      className="rounded-none"
    >
      <DrawerContent className="text-white bg-(--bg)">
        <DataFetch />
      </DrawerContent>
    </Drawer>
  )
}

export default UsersDrawer
