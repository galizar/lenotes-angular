export default {
  displayName: 'api',
	preset: '../../jest.preset.js' ,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
