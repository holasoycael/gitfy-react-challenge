import { useState, useMemo } from 'react'
import type { Key } from 'react'

// heroui
import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/react'

// icons lucide
import { Inbox as IconInbox } from 'lucide-react'

// components JSX
import RepoItem from 'components/RepoItem'

// types and interfaces
import type { DataRepoListProps, TSortKey } from './types'
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

const DataRepoList = ({ repos, username }: DataRepoListProps) => {
  const [sortKey, setSortKey] = useState<TSortKey>('stars-desc')

  const sortedRepos = useMemo(() => sortRepos(repos, sortKey), [repos, sortKey])

  const handleSortChange = (keys: 'all' | Set<Key>) => {
    if (keys === 'all') return
    const selected = Array.from(keys)[0]
    if (selected) setSortKey(String(selected) as TSortKey)
  }

  return (
    <div className="w-full flex flex-col" data-testid={sortedRepos.length ? 'repo-list' : 'repo-list__empty-state'}>
      <div
        className="w-full flex items-center justify-between pb-4 border-b border-white/8 h-7"
        data-testid="repo-list__header"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Repositórios</span>
          <span className="text-xs text-white/30 font-light">({repos.length})</span>
        </div>
        {sortedRepos.length && (
          <Select
            size="sm"
            variant="bordered"
            selectedKeys={new Set([sortKey])}
            onSelectionChange={handleSortChange}
            className="w-36"
            classNames={{
              trigger: 'border-white/10 h-7 min-h-7 text-xs bg-transparent',
              value: 'text-xs text-white/60',
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
        )}
      </div>

      {sortedRepos.length ? (
        <div data-testid="repo-list__items">
          {sortedRepos.map((repo) => (
            <RepoItem key={repo.id} repo={repo} username={username} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <IconInbox size={28} className="text-white/15" />
          <p className="text-xs text-white/40 font-light">Nenhum repositório público.</p>
        </div>
      )}
    </div>
  )
}

export default DataRepoList
