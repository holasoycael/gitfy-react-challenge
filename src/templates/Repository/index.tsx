import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'

// models
import Github from 'models/Github'

// heroui
import { Card } from '@heroui/react'
import { Button } from '@heroui/react'
import { Chip } from '@heroui/react'
import { Skeleton } from '@heroui/react'

// icons lucide
import { ArrowLeft as IconArrowLeft } from 'lucide-react'
import { ExternalLink as IconExternalLink } from 'lucide-react'
import { Star as IconStar } from 'lucide-react'
import { AlertCircle as IconAlertCircle } from 'lucide-react'

// components JSX
import Atmosphere from 'components/Atmosphere'
import GlowTop from 'components/GlowTop'
import GlowBottom from 'components/GlowBottom'

const fetchRepo = async ([, owner, repo]: [string, string, string]) => {
  return Github.repos.fetchByName(owner, repo)
}

const Repository = () => {
  const { user = '', repository = '' } = useParams<{ user?: string; repository?: string }>()
  const navigate = useNavigate()

  const { data, error } = useSWR(['repo', user, repository], fetchRepo)

  const handleBack = () => {
    navigate(`/${user}`)
  }

  const renderContent = () => {
    if (error) {
      return (
        <Card
          className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-red-500/20 p-6 shadow-2xl rounded-2xl"
          data-testid="repository__error"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
            <div className="p-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <IconAlertCircle size={32} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-white" data-testid="repository__error-title">
                Repositório não encontrado
              </h2>
              <p className="text-xs text-white/50 font-light" data-testid="repository__error-description">
                Não foi possível carregar <span className="text-primary font-medium">{repository}</span>.
              </p>
            </div>
            <Button
              variant="flat"
              size="sm"
              onPress={handleBack}
              className="text-white/70 text-xs"
              data-testid="repository__button--back-error"
            >
              <IconArrowLeft size={14} />
              Voltar ao Perfil
            </Button>
          </div>
        </Card>
      )
    }

    if (!data) {
      return (
        <Card
          className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 shadow-2xl rounded-2xl space-y-4"
          data-testid="repository__skeleton"
        >
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-2/3 rounded-lg" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-8 w-32 rounded-lg mt-2" />
        </Card>
      )
    }

    return (
      <Card
        className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 p-5 shadow-2xl rounded-2xl space-y-4"
        data-testid="repository__card"
      >
        <div className="flex justify-between items-center">
          <Button
            variant="light"
            size="sm"
            onPress={handleBack}
            className="text-white/70 hover:text-white text-xs"
            data-testid="repository__button--back"
          >
            <IconArrowLeft size={14} />
            Voltar
          </Button>
        </div>

        <div className="space-y-2" data-testid="repository__info">
          <h1 className="text-base font-semibold text-white" data-testid="repository__name">
            {data.name}
          </h1>
          {data.description && (
            <p className="text-xs text-white/60 font-light leading-relaxed" data-testid="repository__description">
              {data.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" data-testid="repository__meta">
          <Chip
            variant="flat"
            size="sm"
            className="text-[10px]"
            startContent={<IconStar size={12} className="text-yellow-400" />}
            data-testid="repository__chip--stars"
          >
            {data.stargazers_count}
          </Chip>
          {data.language && (
            <Chip
              variant="flat"
              color="primary"
              size="sm"
              className="text-[10px]"
              data-testid="repository__chip--language"
            >
              {data.language}
            </Chip>
          )}
          {data.fork && (
            <Chip variant="flat" size="sm" className="text-[10px] text-white/50" data-testid="repository__chip--fork">
              Fork
            </Chip>
          )}
        </div>

        <div className="pt-2 border-t border-white/10" data-testid="repository__actions">
          <Button
            as="a"
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            size="sm"
            className="font-medium shadow-md text-xs"
            data-testid="repository__button--github"
          >
            Abrir no GitHub
            <IconExternalLink size={13} />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <main className="dark flex flex-col min-h-screen items-center justify-center p-4 relative overflow-hidden">
      <Atmosphere />
      <GlowTop />
      <GlowBottom />

      <div className="w-full max-w-2xl relative z-1 flex justify-center">{renderContent()}</div>
    </main>
  )
}

export default Repository
