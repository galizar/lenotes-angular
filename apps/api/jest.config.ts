export default {
  displayName: 'api',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  moduleNameMapper: {
    "uuid": require.resolve("uuid") // transitive fix, there is some weird error with uuid resolution
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
