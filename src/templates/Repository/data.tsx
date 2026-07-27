import { Link as RouterLink } from 'react-router'

// models
import Github from 'models/Github'

// heroui
import { Avatar } from '@heroui/react'
import { Button } from '@heroui/react'
import { Link } from '@heroui/react'
import { Chip } from '@heroui/react'

// icons lucide
import { Star as IconStar } from 'lucide-react'
import { Eye as IconEye } from 'lucide-react'
import { GitFork as IconGitFork } from 'lucide-react'
import { Scale as IconScale } from 'lucide-react'
import { BookOpen as IconBookOpen } from 'lucide-react'
import { ExternalLink as IconExternalLink } from 'lucide-react'
import { Link as IconLink } from 'lucide-react'

// components JSX
import MarkdownRenderer from 'components/MarkdownRenderer'

// types and interfaces
import type { DataRepositoryProps } from './types'

const DataRepository = ({ data, user }: DataRepositoryProps) => {
  const { repo, readme } = data

  const languageColor = Github.repos.language.getColor(repo.language)

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_296px] gap-10 items-start" data-testid="repository__data">
      <div className="w-full min-w-0 space-y-4" data-testid="repository__main">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <IconBookOpen size={24} className="text-white/40 shrink-0" strokeWidth={1.5} />
          <h2 className="text-2xl! font-medium text-white/80 uppercase tracking-wider leading-8 mb-0.5!">README.md</h2>
        </div>

        {readme ? (
          <div data-testid="repository__readme">
            <MarkdownRenderer content={readme} />
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-white/40 font-light" data-testid="repository__readme--empty">
            Nenhum arquivo README disponível neste repositório.
          </div>
        )}
      </div>

      <aside className="sticky top-6 space-y-5" data-testid="repository__sidebar">
        <div className="space-y-1.5" data-testid="repository__info">
          <h1
            className="text-[28px]! font-light! text-white leading-tight m-0! font-inter tracking-tight"
            data-testid="repository__name"
          >
            {repo.name}
          </h1>
          {repo.fork && (
            <Chip
              variant="flat"
              size="sm"
              className="text-[10px] text-white/50 bg-white/5"
              data-testid="repository__chip--fork"
            >
              Fork
            </Chip>
          )}
        </div>

        <div className="space-y-2.5" data-testid="repository__about">
          <h2 className="text-base! font-light text-white/40 font-centrale-sans">Sobre</h2>
          {repo.description ? (
            <p className="text-sm text-white/60 font-light leading-relaxed" data-testid="repository__description">
              {repo.description}
            </p>
          ) : (
            <p className="text-sm text-white/30 font-light italic">Sem descrição disponível.</p>
          )}

          {repo.homepage && (
            <div className="flex items-center gap-2 pt-1 text-sm text-white/50">
              <IconLink size={15} className="text-white/30 shrink-0" />
              <Link
                href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                isExternal
                className="text-sm text-white/50 hover:text-[#1FB76B] font-light truncate"
              >
                {repo.homepage}
              </Link>
            </div>
          )}
        </div>

        <div
          className="flex flex-col gap-2.5 text-sm text-white/50 font-light border-t border-white/10 pt-4"
          data-testid="repository__meta"
        >
          <div className="flex items-center gap-2" data-testid="repository__chip--stars">
            <IconStar size={18} className="text-yellow-400/90 shrink-0" />
            <span className="text-xs font-light">
              <strong className="text-xs font-medium text-white">{repo.stargazers_count}</strong> estrelas
            </span>
          </div>

          {typeof repo.subscribers_count === 'number' && (
            <div className="flex items-center gap-2" data-testid="repository__meta--watchers">
              <IconEye size={18} className="text-white/30 shrink-0" />
              <span className="text-xs font-light">
                <strong className="text-xs font-medium text-white">{repo.subscribers_count}</strong> visualizadores
              </span>
            </div>
          )}

          {typeof repo.forks_count === 'number' && (
            <div className="flex items-center gap-2" data-testid="repository__meta--forks">
              <IconGitFork size={18} className="text-white/30 shrink-0" />
              <span className="text-xs font-light">
                <strong className="text-xs font-medium text-white">{repo.forks_count}</strong> forks
              </span>
            </div>
          )}

          {repo.license && (
            <div className="flex items-center gap-2" data-testid="repository__meta--license">
              <IconScale size={18} className="text-white/30 shrink-0" />
              <span className="text-xs font-light">Licença {repo.license.spdx_id || repo.license.name}</span>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-4 space-y-2.5" data-testid="repository__owner">
          <h2 className="text-base! font-light text-white/40 font-centrale-sans">Proprietário</h2>
          <RouterLink
            to={`/${repo.owner?.login || user}`}
            className="flex items-center gap-2.5 group transition"
            data-testid="repository__owner-link"
          >
            <Avatar src={repo.owner?.avatar_url} name={repo.owner?.login || user} className="w-6 h-6 shrink-0" />
            <span className="text-sm font-light text-white/80 group-hover:text-[#1FB76B] transition truncate">
              {repo.owner?.login || user}
            </span>
          </RouterLink>
        </div>

        {repo.language && (
          <div className="border-t border-white/10 pt-4 space-y-2.5" data-testid="repository__language-section">
            <h2 className="text-base! font-light text-white/40 font-centrale-sans">Linguagem</h2>
            <div className="flex items-center gap-2" data-testid="repository__chip--language">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: languageColor || undefined }}
              />
              <span className="text-xs text-white/70 font-light">{repo.language}</span>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-4" data-testid="repository__actions">
          <Button
            as="a"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="bordered"
            size="sm"
            className="w-full text-xs font-medium text-white/80 border-white/15 hover:border-white/30"
            data-testid="repository__button--github"
          >
            Ver no GitHub
            <IconExternalLink size={14} />
          </Button>
        </div>
      </aside>
    </div>
  )
}

export default DataRepository
