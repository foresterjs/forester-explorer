"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serveSchema = serveSchema;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var router = require('koa-simple-router');
var path = require('path');

module.exports = function (config) {

  return function (forester) {

    forester.registerStaticRoute({ route: '/explorer', path: path.join(__dirname, '../public') });

    forester.koa.use(router(function (_) {
      _.get('/schema', serveSchema({ collections: forester.collections, rest: forester.rest }));
    }));
  };
};

function serveSchema(_ref) {
  var collections = _ref.collections;
  var rest = _ref.rest;

  return (function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2, next) {
      var request = _ref2.request;
      var response = _ref2.response;
      var endpointsDescription, collectionName, collectionSchema;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              endpointsDescription = [];

              for (collectionName in collections) {
                collectionSchema = collections[collectionName].schema;

                endpointsDescription.push({
                  name: collectionName,
                  properties: collectionSchema.properties,
                  relations: collectionSchema.relations,
                  endpoints: rest.routes[collectionName] || []
                });
              }

              response.body = endpointsDescription;

              _context.next = 5;
              return next;

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  })();
}
//# sourceMappingURL=index.js.map