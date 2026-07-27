import { useParams } from 'react-router'

// components JSX
import Atmosphere from 'components/Atmosphere'
import GlowTop from 'components/GlowTop'
import GlowBottom from 'components/GlowBottom'
import DataFetch from './fetch'

const Profile = () => {
  const { user, id } = useParams<{ user?: string; id?: string }>()
  const username = user || id || ''

  return (
    <main className="dark flex flex-col min-h-screen items-center p-4 pt-8 relative overflow-hidden">
      <Atmosphere />
      <GlowTop />
      <GlowBottom />

      <div className="w-full max-w-6xl relative z-1">
        <DataFetch username={username} />
      </div>
    </main>
  )
}

export default Profile
