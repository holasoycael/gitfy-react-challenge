// heroui
import { Avatar } from '@heroui/react'
import { Button } from '@heroui/react'
import { Link } from '@heroui/react'

// icons lucide
import { MapPin as IconMapPin } from 'lucide-react'
import { Building as IconBuilding } from 'lucide-react'
import { Link as IconLink } from 'lucide-react'
import { Mail as IconMail } from 'lucide-react'
import { Users as IconUsers } from 'lucide-react'

// types and interfaces
import type { ProfileCardProps } from './types'

const ProfileCard = ({ data }: ProfileCardProps) => {
  return (
    <aside className="sticky top-6 space-y-5" data-testid="profile-card">
      <div className="relative w-fit" data-testid="profile-card__avatar-container">
        <Avatar
          src={data.avatar_url}
          alt={data.name || data.login}
          className="w-65 h-65 relative"
          radius="full"
          data-testid="profile-card__avatar"
        />
      </div>

      <div className="space-y-1" data-testid="profile-card__info">
        <h1
          className="text-[32px]! font-light! text-white leading-9.5 m-0! font-inter"
          data-testid="profile-card__name"
        >
          {data.name}
        </h1>
        <span className="text-sm font-light! text-white/40 italic" data-testid="profile-card__login">
          {data.login}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {data.bio && (
          <p className="text-sm text-white/60 font-light leading-relaxed" data-testid="profile-card__bio">
            {data.bio}
          </p>
        )}

        <Button
          as="a"
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="bordered"
          size="sm"
          className="w-full text-xs font-medium text-white/80 border-white/15 hover:border-white/30"
          data-testid="profile-card__button--github"
        >
          Ver no GitHub
        </Button>
      </div>

      <div className="flex items-center gap-1 text-sm" data-testid="profile-card__stats">
        <IconUsers size={15} className="text-white/40" />
        <span className="font-medium text-white">{data.followers}</span>
        <span className="text-white/40 font-light">seguidores</span>
        <span className="text-white/20 mx-0.5">·</span>
        <span className="font-medium text-white">{data.following}</span>
        <span className="text-white/40 font-light">seguindo</span>
      </div>

      <div className="flex flex-col gap-1.5 text-sm text-white/50" data-testid="profile-card__meta">
        {data.location && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--location">
            <IconMapPin size={15} className="text-white/30 shrink-0" />
            <span className="font-light">{data.location}</span>
          </div>
        )}

        {Boolean(data.company) && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--company">
            <IconBuilding size={15} className="text-white/30 shrink-0" />
            <span className="font-light">{String(data.company)}</span>
          </div>
        )}

        {Boolean(data.email) && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--email">
            <IconMail size={15} className="text-white/30 shrink-0" />
            <span className="font-light">{String(data.email)}</span>
          </div>
        )}

        {data.blog && (
          <div className="flex items-center gap-1.5" data-testid="profile-card__meta--blog">
            <IconLink size={15} className="text-white/30 shrink-0" />
            <Link
              href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
              isExternal
              className="text-sm text-white/50 hover:text-[#1FB76B] font-light truncate"
            >
              {data.blog}
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}

export default ProfileCard
