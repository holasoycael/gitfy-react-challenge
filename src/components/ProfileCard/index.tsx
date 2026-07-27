import { useNavigate } from 'react-router'

// heroui
import { Card } from '@heroui/react'
import { Avatar } from '@heroui/react'
import { Button } from '@heroui/react'
import { Chip } from '@heroui/react'
import { Link } from '@heroui/react'

// icons lucide
import { ArrowLeft as IconArrowLeft } from 'lucide-react'
import { ExternalLink as IconExternalLink } from 'lucide-react'
import { MapPin as IconMapPin } from 'lucide-react'
import { Building as IconBuilding } from 'lucide-react'
import { Link as IconLink } from 'lucide-react'
import { Mail as IconMail } from 'lucide-react'
import { Calendar as IconCalendar } from 'lucide-react'
import { FolderGit2 as IconFolderGit } from 'lucide-react'
import { Users as IconUsers } from 'lucide-react'
import { UserCheck as IconUserCheck } from 'lucide-react'
import { FileCode2 as IconFileCode } from 'lucide-react'

// types and interfaces
import type { ProfileCardProps } from './types'

const ProfileCard = ({ data }: ProfileCardProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const formattedDate = new Date(data.created_at).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric'
  })

  return (
    <Card
      className="bg-black/40 backdrop-blur-md border border-white/10 p-4 space-y-4 shadow-2xl rounded-2xl h-fit sticky top-4"
      data-testid="profile-card"
    >
      <div className="flex justify-between items-center w-full" data-testid="profile-card__top-bar">
        <Button
          variant="light"
          size="sm"
          onPress={handleBack}
          className="text-white/70 hover:text-white text-xs"
          data-testid="profile-card__button--back"
        >
          <IconArrowLeft size={14} />
          Voltar
        </Button>
        <Chip variant="flat" color="primary" size="sm" className="text-[10px]" data-testid="profile-card__type-chip">
          {data.type || 'User'}
        </Chip>
      </div>

      <div className="flex flex-col items-center gap-3" data-testid="profile-card__header">
        <div className="relative group" data-testid="profile-card__avatar-container">
          <div className="absolute -inset-0.5 bg-linear-to-r from-[#1FB76B] to-emerald-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300" />
          <Avatar
            src={data.avatar_url}
            alt={data.name || data.login}
            className="w-20 h-20 text-large relative border-2 border-white/20"
            data-testid="profile-card__avatar"
          />
        </div>

        <div className="flex flex-col items-center space-y-1 text-center w-full" data-testid="profile-card__info">
          <h1 className="text-base font-semibold text-white tracking-wide" data-testid="profile-card__name">
            {data.name || data.login}
          </h1>
          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#1FB76B] hover:underline flex items-center gap-1"
            data-testid="profile-card__login"
          >
            @{data.login}
            <IconExternalLink size={12} />
          </a>
          {data.bio && (
            <p className="text-xs text-white/60 font-light pt-1 leading-relaxed" data-testid="profile-card__bio">
              {data.bio}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2" data-testid="profile-card__stats">
        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10"
          data-testid="profile-card__stat--repos"
        >
          <IconFolderGit className="text-[#1FB76B] mb-0.5" size={14} />
          <span className="text-sm font-semibold text-white">{data.public_repos}</span>
          <span className="text-[10px] text-white/50 font-light">Repos</span>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10"
          data-testid="profile-card__stat--followers"
        >
          <IconUsers className="text-[#1FB76B] mb-0.5" size={14} />
          <span className="text-sm font-semibold text-white">{data.followers}</span>
          <span className="text-[10px] text-white/50 font-light">Seguidores</span>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10"
          data-testid="profile-card__stat--following"
        >
          <IconUserCheck className="text-[#1FB76B] mb-0.5" size={14} />
          <span className="text-sm font-semibold text-white">{data.following}</span>
          <span className="text-[10px] text-white/50 font-light">Seguindo</span>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10"
          data-testid="profile-card__stat--gists"
        >
          <IconFileCode className="text-[#1FB76B] mb-0.5" size={14} />
          <span className="text-sm font-semibold text-white">{data.public_gists}</span>
          <span className="text-[10px] text-white/50 font-light">Gists</span>
        </div>
      </div>

      <div
        className="flex flex-col gap-2 text-xs text-white/60 pt-2 border-t border-white/10"
        data-testid="profile-card__meta"
      >
        {data.location && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--location">
            <IconMapPin size={13} className="text-[#1FB76B] shrink-0" />
            <span className="font-light truncate">{data.location}</span>
          </div>
        )}

        {Boolean(data.company) && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--company">
            <IconBuilding size={13} className="text-[#1FB76B] shrink-0" />
            <span className="font-light truncate">{String(data.company)}</span>
          </div>
        )}

        {data.blog && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--blog">
            <IconLink size={13} className="text-[#1FB76B] shrink-0" />
            <Link
              href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
              isExternal
              className="text-xs text-white/60 hover:text-white underline font-light truncate"
            >
              {data.blog}
            </Link>
          </div>
        )}

        {Boolean(data.email) && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--email">
            <IconMail size={13} className="text-[#1FB76B] shrink-0" />
            <span className="font-light truncate">{String(data.email)}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5" data-testid="profile-card__meta--created">
          <IconCalendar size={13} className="text-[#1FB76B] shrink-0" />
          <span className="font-light">Criado em {formattedDate}</span>
        </div>
      </div>

      <div className="pt-1" data-testid="profile-card__actions">
        <Button
          as="a"
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="sm"
          className="w-full font-medium shadow-md text-xs"
          data-testid="profile-card__button--github"
        >
          Ver no GitHub
          <IconExternalLink size={13} />
        </Button>
      </div>
    </Card>
  )
}

export default ProfileCard
