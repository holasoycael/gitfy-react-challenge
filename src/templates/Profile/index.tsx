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
import DataFetch from './fetch'

const Profile = () => {
  const { user, id } = useParams<{ user?: string; id?: string }>()
  const navigate = useNavigate()
  const username = user || id || ''

  const handleBack = () => {
    navigate('/')
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
            data-testid="profile__button--back"
          >
            <IconArrowLeft size={14} strokeWidth={1.5} />
            Voltar
          </Button>

          <DataFetch username={username} />
        </div>
      </main>
    </SimpleBar>
  )
}

export default Profile
