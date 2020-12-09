/** @format */

const proxy = require('http-proxy-middleware');
// testing
module.exports = function (app) {
	app.use(proxy('/auth/google', { target: 'http://localhost:3000/' }));
};
