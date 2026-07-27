import { useEffect } from 'react'

// models
import Users from 'models/Users'

// components JSX
import ProfileCard from 'components/ProfileCard'
import RepoList from 'components/RepoList'

// types and interfaces
import type { DataProfileProps } from './types'

const DataProfile = ({ data, repos, reposLoading, reposError }: DataProfileProps) => {
  const { add } = Users.$.UserState()

  useEffect(() => {
    const { login, ...rest } = data
    add(login, rest)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start" data-testid="profile__data">
      <ProfileCard data={data} />
      <RepoList repos={repos} username={data.login} isLoading={reposLoading} isError={reposError} />
    </div>
  )
}

export default DataProfile
