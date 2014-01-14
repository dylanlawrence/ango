'use strict';

module.exports = {
	env: 'production',
	app: {
		name: "Ango FullStack"
	},
	mongo: {
		uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ango'
	},
	facebook: {
		clientID: "APP_ID",
		clientSecret: "APP_SECRET",
		callbackURL: "http://example.com:3000/auth/facebook/callback"
	},
	twitter: {
		clientID: "APP_ID",
		clientSecret: "APP_SECRET",
		callbackURL: "http://example.com:3000/auth/twitter/callback"
	},
	github: {
		clientID: "APP_ID",
		clientSecret: "APP_SECRET",
		callbackURL: "http://example.com:3000/auth/github/callback"
	},
	google: {
		clientID: "APP_ID",
		clientSecret: "APP_SECRET",
		callbackURL: "http://example.com:3000/auth/google/callback"
	}
};