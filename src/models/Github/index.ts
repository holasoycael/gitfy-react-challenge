// childrens
import search from './search'
import repos from './repos'

export default new (class Github {
  search = search
  repos = repos
})()
