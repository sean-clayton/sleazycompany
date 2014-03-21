var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var locals = res.locals,
    view = new keystone.View(req, res);

  // Set locals
  locals.section = 'downloads';

  // Render the view
  view.render('downloads');

  req.flash('warning', 'Red items are the required mods included in the modpack, but are separated if you already have some installed. Blue items are highly recommended mods. Gray items are completely optional mods.');
}
