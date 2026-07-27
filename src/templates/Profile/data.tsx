import { useEffect } from 'react'

// models
import Users from 'models/Users'

// components JSX
import ProfileCard from 'components/ProfileCard'
import RepoList from 'components/RepoList'

// types and interfaces
import type { DataProfileProps } from './types'

const DataProfile = ({ data }: DataProfileProps) => {
  const { add } = Users.$.UserState()

  useEffect(() => {
    const { login, ...rest } = data
    add(login, { ...rest, accessedAt: Date.now() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-6 lg:gap-10 items-start"
      data-testid="profile__data"
    >
      <ProfileCard data={data} />
      <RepoList username={data.login} />
    </div>
  )
}

export default DataProfile
