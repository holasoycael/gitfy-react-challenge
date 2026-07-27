import { useNavigate } from 'react-router'

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

  const languageColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#8b8b8b' : null

  const formattedDate = new Date(repo.updated_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 transition cursor-pointer group"
      data-testid={`repo-item--${repo.name}`}
    >
      <div className="flex flex-col gap-1 min-w-0 flex-1 pr-3">
        <span
          className="text-xs font-medium text-white group-hover:text-[#1FB76B] transition truncate"
          data-testid="repo-item__name"
        >
          {repo.name}
        </span>
        {repo.description && (
          <p
            className="text-[11px] text-white/40 font-light truncate leading-relaxed"
            data-testid="repo-item__description"
          >
            {repo.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-0.5">
          {repo.language && (
            <div className="flex items-center gap-1" data-testid="repo-item__language">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: languageColor }} />
              <span className="text-[10px] text-white/50 font-light">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-0.5" data-testid="repo-item__stars">
            <IconStar size={11} className="text-white/40" />
            <span className="text-[10px] text-white/50 font-light">{repo.stargazers_count}</span>
          </div>
          {repo.fork && (
            <div className="flex items-center gap-0.5" data-testid="repo-item__fork">
              <IconGitFork size={11} className="text-white/40" />
              <span className="text-[10px] text-white/50 font-light">fork</span>
            </div>
          )}
          <span className="text-[10px] text-white/30 font-light" data-testid="repo-item__date">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RepoItem
