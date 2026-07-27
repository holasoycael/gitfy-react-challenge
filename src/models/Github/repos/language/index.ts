export default new (class {
  data: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Lua: '#000080',
    Elixir: '#6e4a7e',
    Haskell: '#5e5086',
    Scala: '#c22d40',
    R: '#198CE7',
    Jupyter: '#DA5B0B',
    Dockerfile: '#384d54',
    Makefile: '#427819'
  }

  getColor(language?: string | null): string {
    if (!language) return '#8b8b8b'
    return this.data[language] || '#8b8b8b'
  }
})()
