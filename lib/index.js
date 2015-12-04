"use strict";

const router = require('koa-simple-router');
const path = require('path');


module.exports = function (forester) {

  forester.registerStaticRoute({route: '/explorer', path: path.join( __dirname, '../public')});

  forester.koa.use(
    router(_ => {
      _.get('/schema', serveSchema({collections: forester.collections, rest: forester.rest}));
    })
  );

};


export function serveSchema({collections, rest}) {
  return async function ({request, response}, next) {
    var endpointsDescription = [];

    for (var collectionName in collections) {
      var collectionSchema = collections[collectionName].schema;
      endpointsDescription.push({
        name: collectionName,
        properties: collectionSchema.properties,
        relations: collectionSchema.relations,
        endpoints: rest.routes[collectionName] || []
      });
    }

    response.body = endpointsDescription;

    await next;
  }
}
