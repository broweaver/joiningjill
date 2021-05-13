module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  testEnvironment: 'node',
  globalSetup: './src/tests/globalSetup.ts'
}
