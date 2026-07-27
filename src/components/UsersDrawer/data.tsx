import { useNavigate } from 'react-router'
import { Tooltip } from 'react-tooltip'
import SimpleBar from 'simplebar-react'

// contexts
import { IsOpenCartContext } from 'contexts/App'

// models
import Users from 'models/Users'

// heroui
import { DrawerHeader } from '@heroui/react'
import { DrawerBody } from '@heroui/react'
import { DrawerFooter } from '@heroui/react'
import { Button } from '@heroui/react'
import { Avatar } from '@heroui/react'

// components JSX
import ScrollShadow from 'components/ScrollShadow'

// icons lucide
import { Users as IconUsers } from 'lucide-react'
import { Trash2 as IconTrash } from 'lucide-react'
import { ExternalLink as IconExternalLink } from 'lucide-react'

// types and interfaces
import type { DataUsersDrawerProps } from './types'

const DataUsersDrawer = ({ data }: DataUsersDrawerProps) => {
  const navigate = useNavigate()

  const { setIsOpenCart } = IsOpenCartContext()

  const { remove, clear } = Users.$.UserState()

  const sortedData = Users.data.__Array__.sortByAccessedAt(data)

  const handleNavigate = (login: string) => {
    setIsOpenCart(false)
    navigate(`/${login}`)
  }

  const handleRemove = (login: string) => remove(login)
  const handleClearAll = () => clear()

  return (
    <>
      <DrawerHeader className="flex flex-col gap-1 border-b border-white/10 p-4" data-testid="users-drawer__header">
        <div className="flex items-center gap-2.5">
          <IconUsers className="text-primary" size={20} strokeWidth={1} />
          <span className="text-base font-medium text-white leading-5 font-centrale-sans">Usuários Salvos</span>
          <span className="text-xs text-white/70 font-light font-centrale-sans">
            ({sortedData.length} {sortedData.length === 1 ? 'usuário' : 'usuários'})
          </span>
        </div>
      </DrawerHeader>

      <DrawerBody className="p-0 overflow-hidden" data-testid="users-drawer__body">
        {sortedData.length ? (
          <div className="block overflow-hidden w-full h-full">
            <ScrollShadow shadowColor="#0d1117">
              {({ scrollRef, Shadow }) => (
                <SimpleBar scrollableNodeProps={{ ref: scrollRef }}>
                  <div className="block overflow-hidden w-full h-full">
                    <Shadow>
                      <div className="flex flex-col gap-2.5 p-4">
                        {sortedData.map((user) => (
                          <div
                            key={user.login}
                            onClick={() => handleNavigate(user.login)}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 transition cursor-pointer group"
                            data-testid={`users-drawer__item--${user.login}`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar
                                src={user.avatar_url}
                                alt={user.name || user.login}
                                size="sm"
                                className="border border-white/10 shrink-0"
                                data-testid="users-drawer__avatar"
                              />
                              <div className="flex flex-col space-y-1 min-w-0">
                                <span
                                  className="text-xs font-medium text-white truncate"
                                  data-testid="users-drawer__name"
                                >
                                  {user.name || user.login}
                                </span>
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-[11px] text-[#1FB76B] font-mono truncate leading-3.5 shrink-0">
                                    @{user.login}
                                  </span>
                                  {user.bio && (
                                    <span className="text-[11px] text-white/40 truncate max-w-24 sm:max-w-44 font-extralight leading-3.5">
                                      {user.bio}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                radius="full"
                                onPress={() => handleNavigate(user.login)}
                                color="default"
                                className="text-white"
                                data-testid="users-drawer__button--view"
                                data-tooltip-id="users-drawer__item"
                                data-tooltip-content="Ver perfil"
                              >
                                <IconExternalLink size={15} strokeWidth={1} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                radius="full"
                                onPress={() => handleRemove(user.login)}
                                color="danger"
                                data-testid="users-drawer__button--remove"
                                data-tooltip-id="users-drawer__item"
                                data-tooltip-content="Remover"
                              >
                                <IconTrash size={15} strokeWidth={1} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Shadow>
                  </div>
                </SimpleBar>
              )}
            </ScrollShadow>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full gap-3 py-16 text-white/40 text-center px-4"
            data-testid="users-drawer__empty-state"
          >
            <IconUsers size={40} strokeWidth={1} className="text-white/20 mb-1" />
            <p className="text-sm font-light text-white/70">Nenhum usuário salvo ainda.</p>
            <p className="text-xs text-white/40 max-w-72.5 font-extralight">
              Busque e visite perfis de desenvolvedores para registrá-los aqui automaticamente.
            </p>
          </div>
        )}
      </DrawerBody>

      {!!data.length && (
        <DrawerFooter
          className="border-t border-white/10 flex items-center justify-between p-4 bg-black/20"
          data-testid="users-drawer__footer"
        >
          <span className="text-xs text-white/40">Total: {data.length}</span>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={handleClearAll}
            data-testid="users-drawer__button--clear"
            data-tooltip-id="users-drawer__item"
            data-tooltip-content="Limpar todos os usuários salvos"
            className="text-[#1FB76B]"
          >
            Limpar Histórico
          </Button>
        </DrawerFooter>
      )}

      <Tooltip
        id="users-drawer__item"
        place="top"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          color: '#222'
        }}
      />
    </>
  )
}

export default DataUsersDrawer
