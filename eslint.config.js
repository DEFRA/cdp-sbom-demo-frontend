import neostandard from 'neostandard'

export default neostandard({
  env: ['node', 'vitest', 'browser'],
  ignores: [...neostandard.resolveIgnoresFromGitignore()],
  noJsx: true,
  noStyle: true
})
