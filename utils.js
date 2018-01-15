'use strict';

var fs = require('fs');

//Function to create directories recursively if not exists
exports.createDir = function (dir) {
    const splitPath = dir.split('/');
    splitPath.reduce(function (dirPath, subPath) {
        let currentPath;
        if (subPath != '.') {
            currentPath = dirPath + '/' + subPath;
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
            }
        } else {
            currentPath = subPath;
        }
        return currentPath
    }, '');
};

/**
 * Merge object `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function merge(a, b) {
	for (var key in b) {
		if (exports.merge.call(b, key) && b[key]) {
			if ('object' === typeof(b[key])) {
				if ('undefined' === typeof(a[key])) a[key] = {};
					exports.merge(a[key], b[key]);
			} else {
				a[key] = b[key];
			}
		}
	}
	return a;
};