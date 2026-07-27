// childrens
import Fetch from './fetch'

// types and interfaces
import type { RepoListProps } from './types'

const RepoList = ({ username }: RepoListProps) => {
  return <Fetch username={username} />
}

export default RepoList
