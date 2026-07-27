import { useState, useMemo } from 'react'
import type { Key } from 'react'
import SimpleBar from 'simplebar-react'

// heroui
import { Card } from '@heroui/react'
import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/react'
import { Skeleton } from '@heroui/react'

// icons lucide
import { FolderGit2 as IconFolderGit } from 'lucide-react'
import { AlertCircle as IconAlertCircle } from 'lucide-react'
import { Inbox as IconInbox } from 'lucide-react'

// components JSX
import RepoItem from 'components/RepoItem'

// types and interfaces
import type { RepoListProps, TSortKey } from './types'
import type { IGitHubRepo } from 'models/Github/repos/types'

const SORT_OPTIONS = [
  { key: 'stars-desc', label: 'Estrelas ↓' },
  { key: 'stars-asc', label: 'Estrelas ↑' },
  { key: 'name', label: 'Nome A-Z' },
  { key: 'updated', label: 'Atualização' }
]

const sortRepos = (repos: IGitHubRepo[], sortKey: TSortKey): IGitHubRepo[] => {
  const sorted = [...repos]

  switch (sortKey) {
    case 'stars-desc':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    case 'stars-asc':
      return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'updated':
      return sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    default:
      return sorted
  }
}

const RepoList = ({ repos, username, isLoading, isError }: RepoListProps) => {
  const [sortKey, setSortKey] = useState<TSortKey>('stars-desc')

  const sortedRepos = useMemo(() => sortRepos(repos, sortKey), [repos, sortKey])

  const handleSortChange = (keys: 'all' | Set<Key>) => {
    if (keys === 'all') return
    const selected = Array.from(keys)[0]
    if (selected) setSortKey(String(selected) as TSortKey)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2 p-3" data-testid="repo-list__skeleton">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-lg w-full" />
          ))}
        </div>
      )
    }

    if (isError) {
      return (
        <div
          className="flex flex-col items-center justify-center h-full gap-2 py-12 text-center px-4"
          data-testid="repo-list__error"
        >
          <IconAlertCircle size={28} className="text-red-400/60" />
          <p className="text-xs text-white/50 font-light">Erro ao carregar repositórios.</p>
        </div>
      )
    }

    if (!sortedRepos.length) {
      return (
        <div
          className="flex flex-col items-center justify-center h-full gap-2 py-12 text-center px-4"
          data-testid="repo-list__empty-state"
        >
          <IconInbox size={28} className="text-white/20" />
          <p className="text-xs text-white/50 font-light">Nenhum repositório público.</p>
        </div>
      )
    }

    return (
      <SimpleBar className="h-full max-h-[calc(100vh-180px)] p-3">
        <div className="flex flex-col gap-2" data-testid="repo-list__items">
          {sortedRepos.map((repo) => (
            <RepoItem key={repo.id} repo={repo} username={username} />
          ))}
        </div>
      </SimpleBar>
    )
  }

  return (
    <Card
      className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-fit max-h-[calc(100vh-32px)]"
      data-testid="repo-list"
    >
      <div
        className="flex items-center justify-between p-3 border-b border-white/10 shrink-0"
        data-testid="repo-list__header"
      >
        <div className="flex items-center gap-2">
          <IconFolderGit className="text-[#1FB76B]" size={15} />
          <span className="text-xs font-medium text-white">Repositórios</span>
          {!isLoading && <span className="text-[10px] text-white/40 font-light">({repos.length})</span>}
        </div>
        <Select
          size="sm"
          variant="flat"
          selectedKeys={new Set([sortKey])}
          onSelectionChange={handleSortChange}
          className="w-36"
          classNames={{
            trigger: 'bg-white/5 border-white/10 h-7 min-h-7 text-xs',
            value: 'text-xs text-white/70',
            popoverContent: 'bg-zinc-900 border border-white/10'
          }}
          aria-label="Ordenar repositórios"
          data-testid="repo-list__select--sort"
        >
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.key} className="text-xs">
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1 overflow-hidden" data-testid="repo-list__content">
        {renderContent()}
      </div>
    </Card>
  )
}

export default RepoList
