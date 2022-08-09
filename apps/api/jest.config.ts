export default {
  displayName: 'api',
	preset: '../../jest.preset.js' ,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  moduleNameMapper: {
    "uuid": require.resolve('uuid'), // transitive fix, there is some weird error with uuid resolution
		"@lenotes-ng/shared/model": require.resolve('../../libs/shared/model/src/index.ts'),
		"@lenotes-ng/shared/assets": require.resolve('../../libs/shared/assets/src/index.ts')
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
