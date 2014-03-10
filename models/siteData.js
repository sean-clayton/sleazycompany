var keystone = require('keystone'),
  Types = keystone.Field.Types;

var SiteData = new keystone.List('SiteData', {
  nocreate: true,
  nodelete: true
});

SiteData.add({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});
Post.register();
