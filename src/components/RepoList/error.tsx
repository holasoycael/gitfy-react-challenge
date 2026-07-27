// heroui
import { Button } from '@heroui/react'

// icons lucide
import { AlertCircle as IconAlertCircle } from 'lucide-react'
import { RotateCcw as IconRotateCcw } from 'lucide-react'

// types and interfaces
import type { ErrorRepoListProps } from './types'

const ErrorRepoList = ({ username, onRetry }: ErrorRepoListProps) => {
  return (
    <div className="w-full flex flex-col" data-testid="repo-list__error">
      <div
        className="w-full flex items-center justify-between pb-4 border-b border-white/8 h-7"
        data-testid="repo-list__header"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Repositórios</span>
          <span className="text-xs text-white/30 font-light">(0)</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2.5 py-14 text-center">
        <IconAlertCircle size={24} strokeWidth={1.5} className="text-red-400/60 mb-0.5" />

        <div className="space-y-1">
          <p className="text-xs font-normal text-white/70">Não foi possível carregar os repositórios</p>
          <p className="text-[11px] text-white/40 font-light">
            Ocorreu uma falha ao buscar os repositórios de <span className="text-[#1FB76B] font-mono">@{username}</span>
          </p>
        </div>

        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={onRetry}
          className="mt-1 text-xs font-light text-[#1FB76B] bg-[#1FB76B]/10 hover:bg-[#1FB76B]/20"
          data-testid="repo-list__button--retry"
        >
          <IconRotateCcw size={13} strokeWidth={1.5} />
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

export default ErrorRepoList
