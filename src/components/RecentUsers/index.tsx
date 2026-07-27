import { Tooltip } from 'react-tooltip'

// models
import Users from 'models/Users'

// heroui
import { Button } from '@heroui/react'

// icons lucide
import { ClockClockwiseIcon as IconClockClockwise } from '@phosphor-icons/react'
import { SparkleIcon as IconSparkles } from '@phosphor-icons/react'

// types and interfaces
import type { RecentUsersProps } from './types'

const RecentUsers = ({ items, onClick, onOpen }: RecentUsersProps) => {
  const displayedItems = items.slice(0, 4)

  return (
    <div className="w-full flex flex-col space-y-6" data-testid="recent-users__wrapper">
      <div
        className="w-full flex max-sm:flex-col items-center justify-center gap-2.5 text-xs text-white/60 px-1 flex-wrap"
        data-testid="recent-users__container"
      >
        <div className="flex items-center gap-1.5" data-testid="recent-users__header">
          {displayedItems.length ? (
            <div className="flex text-white/50">
              <IconClockClockwise size={20} strokeWidth={1} />
            </div>
          ) : (
            <div className="flex text-white/50">
              <IconSparkles size={20} strokeWidth={1} />
            </div>
          )}
        </div>

        <div className="flex max-sm:flex-col items-center gap-2.5 flex-wrap" data-testid="recent-users__list">
          {(displayedItems.length ? displayedItems : Users.data.DEFAULT_SUGGESTIONS).map((username) => (
            <button
              key={username}
              type="button"
              onClick={() => onClick(username)}
              className="text-[#1FB76B] lowercase cursor-pointer transition-[background-size] duration-300 ease-in-out bg-no-repeat bg-center bg-size-[76%_100%] hover:bg-size-[100%_100%]"
              style={{
                backgroundImage: 'linear-gradient(to bottom, transparent 62%, rgba(31, 183, 107, 0.35) 0)'
              }}
              data-testid={`recent-users__item--${username}`}
              data-tooltip-id="recent-users__item"
              data-tooltip-content={username}
            >
              <span data-testid="recent-users__username">{username}</span>
            </button>
          ))}
        </div>
        <Tooltip
          id="recent-users__item"
          place="top"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            color: '#222'
          }}
        />
      </div>

      <div className="flex justify-center min-h-8">
        <Button
          size="sm"
          variant="shadow"
          color="primary"
          isDisabled={!items.length}
          onPress={onOpen}
          data-testid="recent-users__button--open"
        >
          <span className="text-xs font-light italic w-full">Ver todos buscados</span>
        </Button>
      </div>
    </div>
  )
}

export default RecentUsers
