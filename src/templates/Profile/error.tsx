import { useNavigate } from 'react-router'

// heroui
import { Card } from '@heroui/react'
import { CardBody } from '@heroui/react'
import { Button } from '@heroui/react'

// icons lucide
import { AlertCircle as IconAlertCircle } from 'lucide-react'
import { ArrowLeft as IconArrowLeft } from 'lucide-react'
import { RotateCcw as IconRotateCcw } from 'lucide-react'

// types and interfaces
import type { ErrorProfileProps } from './types'

const ErrorProfile = ({ username, onRetry }: ErrorProfileProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Card
      className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-red-500/20 p-8 shadow-2xl rounded-2xl"
      data-testid="profile__error"
    >
      <CardBody
        className="flex flex-col items-center justify-center text-center space-y-6 p-0"
        data-testid="profile__error-body"
      >
        <div
          className="p-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
          data-testid="profile__error-icon"
        >
          <IconAlertCircle size={48} />
        </div>
        <div className="space-y-2" data-testid="profile__error-message">
          <h2 className="text-xl font-bold text-white" data-testid="profile__error-title">
            Perfil não encontrado
          </h2>
          <p className="text-sm text-white/60 max-w-md" data-testid="profile__error-description">
            Não foi possível carregar as informações do usuário{' '}
            <span className="text-primary font-semibold">@{username || 'desconhecido'}</span>.
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2" data-testid="profile__error-actions">
          <Button
            variant="flat"
            color="default"
            onPress={handleBack}
            className="font-medium text-white/80"
            data-testid="profile__button--back"
          >
            <IconArrowLeft size={16} />
            Voltar ao Início
          </Button>
          <Button
            color="primary"
            onPress={onRetry}
            className="font-semibold shadow-md"
            data-testid="profile__button--retry"
          >
            <IconRotateCcw size={16} />
            Tentar Novamente
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ErrorProfile
