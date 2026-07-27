import { useParams, useNavigate } from 'react-router'
import SimpleBar from 'simplebar-react'

// heroui
import { Button } from '@heroui/react'

// icons lucide
import { ArrowLeft as IconArrowLeft } from 'lucide-react'

// components JSX
import Atmosphere from 'components/Atmosphere'
import GlowTop from 'components/GlowTop'
import GlowBottom from 'components/GlowBottom'
import FetchRepository from './fetch'

const Repository = () => {
  const { user = '', repository = '' } = useParams<{ user?: string; repository?: string }>()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(`/${user}`)
  }

  return (
    <SimpleBar forceVisible="y" autoHide className="h-screen">
      <main className="dark flex flex-col min-h-screen items-center p-6 pt-4 relative overflow-hidden">
        <Atmosphere />
        <GlowTop />
        <GlowBottom />

        <div className="w-full max-w-5xl relative z-1">
          <Button
            variant="light"
            size="sm"
            onPress={handleBack}
            className="text-white/50 hover:text-white text-xs mb-6 -ml-5 font-light"
            data-testid="repository__button--back"
          >
            <IconArrowLeft size={14} strokeWidth={1.5} />
            Voltar
          </Button>

          <FetchRepository user={user} repository={repository} />
        </div>
      </main>
    </SimpleBar>
  )
}

export default Repository
