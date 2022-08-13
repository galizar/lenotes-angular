module.exports = {
  moduleNameMapper: {
    "uuid": require.resolve('uuid'), // transitive fix, there is some weird error with uuid resolution
		"@lenotes-ng/shared/model": require.resolve('./libs/shared/model/src/index.ts'),
		"@lenotes-ng/shared/assets": require.resolve('./libs/shared/assets/src/index.ts'),
		"@lenotes-ng/data-storage": require.resolve('./libs/data-storage/src/index.ts'),
  },
}