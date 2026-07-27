import { useState, useRef } from 'react'

// heroui
import { Input } from '@heroui/input'
import { Spinner } from '@heroui/spinner'

// hooks
import useDebounce from 'hooks/debounce'

// icons lucide
import { Search as IconSearch } from 'lucide-react'
import { PackageOpen as IconPackageOpen } from 'lucide-react'

// childrens
import SearchUserSkeleton from './skeleton'

// types and interfaces
import type { TRowUser, SearchUserProps } from './types'
import type { KeyboardEvent } from 'react'

const SearchUser = ({ onFetch, onSelect, placeholder }: SearchUserProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState<Array<TRowUser>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchUsers = async (query: string) => {
    try {
      const items = await onFetch(query)
      setUsers(items)
      setActiveIndex(items.length === 1 ? 0 : -1)
    } catch {
      setUsers([])
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedFetch = useDebounce(fetchUsers, 400)

  const handleInputChange = (value: string) => {
    const current = value.trim()

    if (current) {
      setSearchValue(current)
      setIsLoading(true)
      setIsOpen(true)
      debouncedFetch(current)
    } else {
      setSearchValue('')
      setUsers([])
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  const handleSelectUser = (user: TRowUser) => {
    setSearchValue(user.username)
    setIsOpen(false)
    setActiveIndex(-1)
    onSelect?.(user)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || users.length === 0) return

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        setActiveIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0))
        break
      }

      case 'ArrowUp': {
        event.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1))
        break
      }

      case 'Tab': {
        event.preventDefault()
        if (event.shiftKey) {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1))
        } else {
          setActiveIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0))
        }
        break
      }

      case 'Enter': {
        event.preventDefault()
        if (activeIndex >= 0 && activeIndex < users.length) {
          handleSelectUser(users[activeIndex])
        }
        break
      }

      case 'Escape': {
        event.preventDefault()
        setSearchValue('')
        setUsers([])
        setIsOpen(false)
        setActiveIndex(-1)
        break
      }
    }
  }

  return (
    <div className="relative w-full" data-testid="search-user__container">
      <Input
        ref={inputRef}
        size="lg"
        variant="bordered"
        placeholder={placeholder}
        value={searchValue}
        onValueChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (users.length > 0) setIsOpen(true)
        }}
        startContent={
          <div>
            <IconSearch size={18} />
          </div>
        }
        endContent={isLoading ? <Spinner data-testid="search-user__loading" size="sm" /> : undefined}
        classNames={{
          mainWrapper: 'w-full',
          inputWrapper: 'pr-1.5',
          input: 'placeholder:text-sm placeholder:text-white/60 placeholder:font-extralight'
        }}
        data-testid="search-user__input"
      />

      {isOpen && searchValue.trim() && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-[#161b22] shadow-lg backdrop-blur-sm"
          data-testid="search-user__dropdown"
          role="listbox"
        >
          {isLoading ? (
            <SearchUserSkeleton />
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={user.username}
                className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors ${
                  index === activeIndex ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
                data-testid={index === activeIndex ? 'search-user__item--active' : 'search-user__item'}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => {
                  event.preventDefault()
                  handleSelectUser(user)
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <img src={user.avatarUrl} alt={user.username} className="h-8 w-8 rounded-full" loading="lazy" />
                <span className="text-sm text-white/90">{user.username}</span>
              </div>
            ))
          ) : (
            <div
              className="p-4 text-sm text-white/50 flex flex-col items-center justify-center space-y-3 min-h-48"
              data-testid="search-user__empty"
            >
              <IconPackageOpen size={44} strokeWidth={0.5} />
              <p className="text-white/80 text-sm font-extralight text-center max-w-sm">Nenhum usuário encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchUser
