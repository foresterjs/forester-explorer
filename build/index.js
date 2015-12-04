"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serveSchema = serveSchema;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const router = require('koa-simple-router');
const path = require('path');

module.exports = function (forester) {

  forester.registerStaticRoute({ route: '/explorer', path: path.join(__dirname, '../public') });

  forester.koa.use(router(function (_) {
    _.get('/schema', serveSchema({ collections: forester.collections, rest: forester.rest }));
  }));
};

function serveSchema(_ref) {
  let collections = _ref.collections;
  let rest = _ref.rest;

  return (function () {
    var ref = _asyncToGenerator(function* (_ref2, next) {
      let request = _ref2.request;
      let response = _ref2.response;

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

      yield next;
    });

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  })();
}
//# sourceMappingURL=index.js.map