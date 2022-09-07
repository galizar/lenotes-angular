// this script configures tsconfig-paths to resolve the TS path aliases to their
// correct relative path. this script is used by the start target of this project
const tsConfigPaths = require('tsconfig-paths');

const tsConfig = tsConfigPaths.loadConfig('apps/api/tsconfig.app.json');

const outputRoot = 'dist/out-tsc';

let paths = {};

for (let [alias, [path]] of Object.entries(tsConfig.paths)) {

	path = path.replace(/\.ts/i, '.js');
	paths[alias] = [`${outputRoot}/${path}`]
}

tsConfigPaths.register({
	baseUrl: tsConfig.absoluteBaseUrl,
	paths
});