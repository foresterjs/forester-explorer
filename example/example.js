"use strict";

var Forester = require('forester');
var explorer = require('../lib/index');

var app = new Forester();

app.use(explorer());

app.registerCollection(require('./json/collections/authors.json'));
app.registerCollection(require('./json/collections/articles.json'));

app.registerDataSource(require('./json/db1.json'));
app.registerMappings(require('./json/mappings.json'));


app.boot()
  .then(() => {
    app.listen({port: 3000});
  })
  .catch((e) => {
    console.log(e.stack)
  });




