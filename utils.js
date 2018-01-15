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