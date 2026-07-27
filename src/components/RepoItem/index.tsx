import { format } from 'date-fns'
import { useNavigate } from 'react-router'
import ptBR from 'date-fns/locale/pt-BR'

// heroui
import { Chip } from '@heroui/react'

// icons lucide
import { Star as IconStar } from 'lucide-react'
import { GitFork as IconGitFork } from 'lucide-react'

// data
import { LANGUAGE_COLORS } from './data'

// types and interfaces
import type { RepoItemProps } from './types'

const RepoItem = ({ repo, username }: RepoItemProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/${username}/${repo.name}`)
  }

  const languageColor = (() => {
    try {
      if (!repo.language) return null
      return LANGUAGE_COLORS[repo.language] || '#8b8b8b'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null
    }
  })()

  const formattedDate = (() => {
    try {
      if (!repo.updated_at) return ''
      return format(new Date(repo.updated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return ''
    }
  })()

  return (
    <div
      onClick={handleNavigate}
      className="py-5 border-b border-white/8 transition cursor-pointer group"
      data-testid={`repo-item--${repo.name}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <span
            className="text-sm font-medium text-[#1FB76B] group-hover:underline transition"
            data-testid="repo-item__name"
          >
            {repo.name}
          </span>
          {repo.description && (
            <p
              className="text-xs text-white/40 font-light leading-relaxed line-clamp-2"
              data-testid="repo-item__description"
            >
              {repo.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-1">
            {repo.language && (
              <div className="flex items-center gap-1" data-testid="repo-item__language">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: languageColor || undefined }}
                />
                <span className="text-xs text-white/40 font-light">{repo.language}</span>
              </div>
            )}
            {!!repo.stargazers_count && (
              <div className="flex items-center gap-1" data-testid="repo-item__stars">
                <IconStar size={13} className="text-white/30" />
                <span className="text-xs text-white/40 font-light">{repo.stargazers_count}</span>
              </div>
            )}
            {repo.fork && (
              <div className="flex items-center gap-1" data-testid="repo-item__fork">
                <IconGitFork size={13} className="text-white/30" />
                <span className="text-xs text-white/40 font-light">Fork</span>
              </div>
            )}
            <span className="text-xs text-white/25 font-light" data-testid="repo-item__date">
              Atualizado em {formattedDate}
            </span>
          </div>
        </div>
        <Chip
          variant="bordered"
          size="sm"
          className="text-[10px] text-white/40 border-white/10 shrink-0 mt-0.5"
          data-testid="repo-item__chip--visibility"
        >
          Public
        </Chip>
      </div>
    </div>
  )
}

export default RepoItem
