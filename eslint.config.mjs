import nextConfig from 'eslint-config-next'

const configs = Array.isArray(nextConfig) ? nextConfig : [nextConfig]

const eslintConfig = [
  ...configs,
  {
    rules: {
      // Calling setState in a mount-only effect ([] deps) to sync localStorage
      // is the standard React pattern. This rule fires too broadly.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default eslintConfig
