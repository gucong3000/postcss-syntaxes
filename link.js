// curl -s https://raw.githubusercontent.com/gucong3000/postcss-syntaxes/HEAD/deps.js | node
"use strict";
const fs = require("fs");
const promisify = require("util").promisify;
(async function () {
	const version = require("./lerna.json").version;
	const versions = require("./package.json").devDependencies;
	let packages = await promisify(fs.readdir)("packages");
	packages = packages.map((pkgName) => (
		require(`./packages/${pkgName}/package.json`)
	));
	packages.forEach(pkg => {
		pkg.version = version;
		versions[pkg.name] = ">=" + version;
	});
	const writeFile = promisify(fs.writeFile);
	await Promise.all(packages.map(pkg => {
		Object.keys(pkg).filter(key => /^(\w+D|d)ependencies$/.test(key)).forEach(deps => {
			Object.keys(pkg[deps]).filter(pkgName => pkgName in versions).forEach(pkgName => {
				if (deps === "peerDependencies" && pkgName === "postcss") {
					pkg.peerDependencies.postcss = ">=5.0.0";
				} else {
					pkg[deps][pkgName] = versions[pkgName];
				}
			});
		});
		return writeFile(`packages/${pkg.name}/package.json`, JSON.stringify(pkg, null, 2) + "\n");
	}));
})().catch(console.error);
