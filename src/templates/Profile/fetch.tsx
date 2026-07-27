import useSWR from 'swr'

// models
import Github from 'models/Github'

// components JSX
import Data from './data'
import Skeleton from './skeleton'
import Error from './error'

// utils
import api from 'utils/api'

// types and interfaces
import type { FetchProfileProps } from './types'
import type { IUser } from 'models/Users/$/types'

const fetchUser = async ([username]: [string]): Promise<IUser> => {
  const response = await api.get<IUser>(`users/${username}`)
  return response.data
}

const fetchRepos = async ([, username]: [string, string]) => {
  return Github.repos.fetchByUsername(username)
}

const FetchProfile = ({ username }: FetchProfileProps) => {
  const { data, error, mutate } = useSWR([username], fetchUser)
  const { data: repos, error: reposError } = useSWR(['repos', username], fetchRepos)

  if (error) return <Error username={username} onRetry={mutate} />
  if (!data) return <Skeleton />

  return <Data data={data} repos={repos || []} reposLoading={!repos && !reposError} reposError={!!reposError} />
}

export default FetchProfile
