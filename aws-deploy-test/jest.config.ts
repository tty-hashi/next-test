import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './', // プロジェクトのルート
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babel を使用して JSX/TSX をトランスパイル
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // CSS モジュールをモック
  },
  transformIgnorePatterns: [
    '/node_modules/', // node_modules 内はトランスパイルしない
  ],
}

module.exports = createJestConfig(customJestConfig)
