import { useNavigate } from 'react-router'

// heroui
import { Button } from '@heroui/react'

// icons lucide
import { AlertCircle as IconAlertCircle } from 'lucide-react'
import { ArrowLeft as IconArrowLeft } from 'lucide-react'
import { RotateCcw as IconRotateCcw } from 'lucide-react'

// types and interfaces
import type { ErrorRepositoryProps } from './types'

const ErrorRepository = ({ repository, user, onRetry }: ErrorRepositoryProps) => {
  const navigate = useNavigate()

  const handleBack = () => navigate(`/${user}`)

  return (
    <div
      className="w-full min-h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-4 text-center my-auto"
      data-testid="repository__error"
    >
      <div className="flex flex-col items-center gap-2">
        <IconAlertCircle size={30} strokeWidth={1.5} className="text-red-400/70 mb-0.5" />

        <div className="flex flex-col items-center gap-1.5 max-w-md" data-testid="repository__error-message">
          <h2 className="text-sm font-medium text-white tracking-wide" data-testid="repository__error-title">
            Repositório não encontrado
          </h2>
          <p className="text-xs text-white/40 font-light leading-relaxed" data-testid="repository__error-description">
            Não foi possível carregar o repositório{' '}
            <span className="text-[#1FB76B] font-mono font-normal">{repository || 'desconhecido'}</span>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1" data-testid="repository__error-actions">
        <Button
          size="sm"
          variant="light"
          onPress={handleBack}
          className="text-xs text-white/50 hover:text-white font-light"
          data-testid="repository__button--back-error"
        >
          <IconArrowLeft size={14} strokeWidth={1.5} />
          Voltar ao perfil
        </Button>
        {onRetry && (
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onPress={onRetry}
            className="text-xs font-light text-[#1FB76B] bg-[#1FB76B]/10 hover:bg-[#1FB76B]/20"
            data-testid="repository__button--retry"
          >
            <IconRotateCcw size={13} strokeWidth={1.5} />
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorRepository
