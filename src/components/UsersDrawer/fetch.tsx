// models
import Users from 'models/Users'

// components JSX
import Data from './data'
import Skeleton from './skeleton'

const FetchUsersDrawer = () => {
  const { users, isReady } = Users.$.UserState()

  const data = Users.data.__.toArray(users)

  if (isReady) return <Data data={data} />
  return <Skeleton />
}

export default FetchUsersDrawer
