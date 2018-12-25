// curl -s https://raw.githubusercontent.com/gucong3000/postcss-syntaxes/HEAD/deps.js | node
"use strict";
const fs = require("fs");
const path = require("path");
const https = require("https");
const headers = {
	"User-Agent": "gucong3000/postcss-syntaxes (https://github.com/gucong3000/postcss-syntaxes)",
};
if (process.env.GH_TOKEN) {
	headers.Authorization = "token " + process.env.GH_TOKEN;
}

function got (path) {
	return new Promise((resolve, reject) => {
		https.get({
			hostname: "api.github.com",
			path,
			headers,
		}, (res) => {
			const rst = [];
			res.on("data", rst.push.bind(rst));
			res.on("end", () => {
				res = Buffer.concat(rst).toString();
				try {
					res = JSON.parse(res);
				} catch (ex) {
					resolve(res);
					return;
				}
				resolve(res);
			});
			res.on("error", reject);
		}).on("error", reject);
	});
}

got("/repos/gucong3000/postcss-syntaxes/git/trees/HEAD").then(head => (
	got(head.tree.find(blob => blob.path === "packages").url)
))
	.then(packages => {
		const rst = {};
		packages.tree.forEach(child => {
			if (child.type === "commit") {
				rst[child.path] = child.sha;
			}
		});
		return rst;
	}).catch(error => {
		console.log(error);
		return {};
	}).then(versions => {
		let pkg = require(path.resolve("package.json"));
		Object.keys(pkg).filter(key => /^(\w+D|d)ependencies$/.test(key)).forEach(deps => {
			Object.keys(pkg[deps]).filter(pkgName => /^postcss-(syntax|jsx|html|markdown)$/.test(pkgName)).forEach(pkgName => {
				let newVersion = versions[pkgName];
				if (!newVersion) {
					if (/^\W*\d+\.\d+\.\d+$/.test(pkg[deps][pkgName])) {
						newVersion = "HEAD";
					} else {
						return;
					}
				}
				pkg[deps][pkgName] = `github:gucong3000/${pkgName}#${newVersion}`;
			});
		});

		pkg = JSON.stringify(pkg, null, 2);
		console.log(pkg);
		if (process.env.CI) {
			fs.writeFile("package.json", pkg, () => {
			});
		}
	});
