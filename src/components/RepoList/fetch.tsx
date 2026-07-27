import useSWR from 'swr'

// models
import Github from 'models/Github'

// childrens
import Data from './data'
import Skeleton from './skeleton'
import Error from './error'

// types and interfaces
import type { FetchRepoListProps } from './types'
import type { TGitHubRepos } from 'models/Github/repos/types'

const fetcher = async ([, username]: [string, string]): Promise<TGitHubRepos> => {
  return Github.repos.fetchByUsername(username)
}

const FetchRepoList = ({ username }: FetchRepoListProps) => {
  const { data, error, mutate } = useSWR(['repos', username], fetcher)

  if (error) return <Error username={username} onRetry={mutate} />
  if (data) return <Data repos={data} username={username} />
  return <Skeleton />
}

export default FetchRepoList
