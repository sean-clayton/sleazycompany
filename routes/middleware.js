/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/', layout: 'left' },
		{ label: 'Intel', key: 'news', href: '/news/', layout: 'left' },
		{ label: 'Bootcamp', href: '#', layout: 'left' },
		{ label: 'Media', key: 'gallery', href: '/media/', layout: 'right' },
		{ label: 'Downloads', key: 'downloads', href: '/downloads/', layout: 'right' },
	];

	locals.user = req.user;

	// Global variables. I really doubt they should go here... <.<

	locals.featuredVideo = 'sYNtlus8YBg';
	locals.tagline = 'It ain\'t easy bein\' sleazy!';

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

}
