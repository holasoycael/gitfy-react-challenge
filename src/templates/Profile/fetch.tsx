import useSWR from 'swr'

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

const FetchProfile = ({ username }: FetchProfileProps) => {
  const { data, error, mutate } = useSWR([username], fetchUser)

  if (error) return <Error username={username} onRetry={mutate} />
  if (data) return <Data data={data} />
  return <Skeleton />
}

export default FetchProfile
