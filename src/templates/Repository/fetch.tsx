import useSWR from 'swr'

// models
import Github from 'models/Github'

// components JSX
import Data from './data'
import Skeleton from './skeleton'
import Error from './error'

// types and interfaces
import type { FetchRepositoryProps, TRepositoryDetailData } from './types'

const fetchRepositoryDetail = async ([, user, repository]: [
  string,
  string,
  string
]): Promise<TRepositoryDetailData> => {
  const [repo, readme] = await Promise.all([
    Github.repos.fetchByName(user, repository),
    Github.repos.fetchReadme(user, repository)
  ])
  return { repo, readme }
}

const FetchRepository = ({ user, repository }: FetchRepositoryProps) => {
  const { data, error, mutate } = useSWR(['repository-detail', user, repository], fetchRepositoryDetail)

  if (error) return <Error repository={repository} user={user} onRetry={mutate} />
  if (data) return <Data data={data} user={user} />
  return <Skeleton />
}

export default FetchRepository
