module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.ts',
  rootDir: './src'
}
