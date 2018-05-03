"use strict";
const path = require("path");
const Module = require("module");
const _findPath = Module._findPath;
Module._findPath = (request, paths, isMain) => {
	if (/^postcss-(html|jsx|markdown|styled|syntax)/i.test(request)) {
		request = path.join(__dirname, "packages", request);
	}
	return _findPath.apply(Module, [request, paths, isMain]);
};
