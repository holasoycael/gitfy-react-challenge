import { useNavigate } from 'react-router'

// heroui
import { Button } from '@heroui/react'

// icons lucide
import { AlertCircle as IconAlertCircle } from 'lucide-react'
import { ArrowLeft as IconArrowLeft } from 'lucide-react'
import { RotateCcw as IconRotateCcw } from 'lucide-react'

// types and interfaces
import type { ErrorProfileProps } from './types'

const ErrorProfile = ({ username, onRetry }: ErrorProfileProps) => {
  const navigate = useNavigate()

  const handleBack = () => navigate('/')

  return (
    <div
      className="w-full min-h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-4 text-center my-auto"
      data-testid="profile__error"
    >
      <div className="flex flex-col items-center gap-2">
        <IconAlertCircle size={30} strokeWidth={1.5} className="text-red-400/70 mb-0.5" />

        <div className="flex flex-col items-center gap-1.5 max-w-md" data-testid="profile__error-message">
          <h2 className="text-sm font-medium text-white tracking-wide" data-testid="profile__error-title">
            Perfil não encontrado
          </h2>
          <p className="text-xs text-white/40 font-light leading-relaxed" data-testid="profile__error-description">
            Não foi possível carregar as informações do usuário{' '}
            <span className="text-[#1FB76B] font-mono font-normal">@{username || 'desconhecido'}</span>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1" data-testid="profile__error-actions">
        <Button
          size="sm"
          variant="light"
          onPress={handleBack}
          className="text-xs text-white/50 hover:text-white font-light"
          data-testid="profile__button--back"
        >
          <IconArrowLeft size={14} strokeWidth={1.5} />
          Voltar ao início
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={onRetry}
          className="text-xs font-light text-[#1FB76B] bg-[#1FB76B]/10 hover:bg-[#1FB76B]/20"
          data-testid="profile__button--retry"
        >
          <IconRotateCcw size={13} strokeWidth={1.5} />
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

export default ErrorProfile
