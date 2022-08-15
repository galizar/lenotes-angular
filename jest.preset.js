module.exports = {
  moduleNameMapper: {
    "uuid": require.resolve('uuid'), // transitive fix, there is some weird error with uuid resolution
		"@lenotes-ng/model": require.resolve('./libs/model/src/index.ts'),
		"@lenotes-ng/data-storage": require.resolve('./libs/data-storage/src/index.ts'),
		"@lenotes-ng/api-behavior": require.resolve('./libs/api-behavior/src/index.ts'),
  },
}