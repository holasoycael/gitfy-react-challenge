// types and interfaces

import { IGitHubUser, TGitHubSearchResponse } from 'models/Github/search/types'

export const mockUsers: IGitHubUser[] = [
  {
    login: 'holasoycael',
    id: 1,
    node_id: 'MDQ6VXNlcjE=',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/holasoycael',
    html_url: 'https://github.com/holasoycael',
    followers_url: 'https://api.github.com/users/holasoycael/followers',
    following_url: 'https://api.github.com/users/holasoycael/following{/other_user}',
    gists_url: 'https://api.github.com/users/holasoycael/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/holasoycael/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/holasoycael/subscriptions',
    organizations_url: 'https://api.github.com/users/holasoycael/orgs',
    repos_url: 'https://api.github.com/users/holasoycael/repos',
    events_url: 'https://api.github.com/users/holasoycael/events{/privacy}',
    received_events_url: 'https://api.github.com/users/holasoycael/received_events',
    type: 'User',
    user_view_type: 'public',
    site_admin: false,
    score: 1
  },
  {
    login: 'holasoydev',
    id: 2,
    node_id: 'MDQ6VXNlcjI=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/holasoydev',
    html_url: 'https://github.com/holasoydev',
    followers_url: 'https://api.github.com/users/holasoydev/followers',
    following_url: 'https://api.github.com/users/holasoydev/following{/other_user}',
    gists_url: 'https://api.github.com/users/holasoydev/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/holasoydev/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/holasoydev/subscriptions',
    organizations_url: 'https://api.github.com/users/holasoydev/orgs',
    repos_url: 'https://api.github.com/users/holasoydev/repos',
    events_url: 'https://api.github.com/users/holasoydev/events{/privacy}',
    received_events_url: 'https://api.github.com/users/holasoydev/received_events',
    type: 'User',
    user_view_type: 'public',
    site_admin: false,
    score: 1
  }
]

export const mockSearchResponse: TGitHubSearchResponse = {
  total_count: 2,
  incomplete_results: false,
  items: mockUsers
}
