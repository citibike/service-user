'use strict';

var config = require('config'),
  path = require('path'),
  glob = require('glob'),
  args = require('argify'),
  Lout = require('lout'),
  Good = require('good'),
  GoodFile = require('good-file'),

  bunyan = require('bunyan'),
  q = require('q');

var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
var Pack = require('../package');





global.log = bunyan.createLogger({
  name: 'service-user'
});

var ENV = process.env.NODE_ENV || 'default';


/**
 * Construct the server
 */
var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
      log: true
    },
    router: {
      stripTrailingSlash: true
    }
  }
});
log.info('server constructed');

/**
 * Create the connection
 */
// port: config.port

server.connection({
  port: process.env.PORT || 3000

});
//debug('added port: ', config.port);
var swaggerOptions = {
  info: {
    'title': 'CITIBIKE Service API Documentation',
    'version': Pack.version
  }
};

server.register([Inert, Vision, {
  'register': HapiSwagger,
  'options': swaggerOptions
}], function (err) {
  err ? log.info("Inert or Vision plugin failed, it will stop swagger") : log.info("Inert or Vision plugin registered, it will start  swagger");
});




/**
 * Build a logger for the server & each service
 */
var reporters = [new GoodFile({
  log: '*'
}, __dirname + '/../logs/server.log')];

server.route({
  method: 'get',
  path: '/{param*}',
  handler: {
    directory: {
      path: __dirname + '/../public',
      listing: true
    }
  }
});
// server.route({
//   method: 'get',
//   path: '/',
//   handler: {
//     directory: {
//       path: __dirname + '/../public',
//       listing: true
//     }
//   }
// });

/**
 * Add logging
 */
server.register({
  register: Good,
  options: {
    opsInterval: 1000,
    reporters: reporters
  }
}, function (err) {
  if (err) throw new Error(err);
  if (ENV !== 'test') console.log('Plugin loaded: Good');
  log.debug('registered Good for logging with reporters: ', reporters);
});

/**
 * Add /docs route
 */
server.register({
  register: Lout
}, function (err) {
  if (err) throw new Error(err);
  if (ENV !== 'test') console.log('Plugin loaded: Lout');
  log.debug('added Lout for /docs');
});

/**
 * If this isn't for testing, start the server
 */
//if (ENV !== 'test')
server.start(function (err) {
  if (err) throw new Error(err);
  log.info('server started!');
  var summary = server.connections.map(function (cn) {
    return {
      labels: cn.settings.labels,
      uri: cn.info.uri
    };
  });
  let userRouter = require(__dirname + '/routes/userRoutes')(server);
  console.log(summary);
  log.info('Connections: ', summary);
  server.log('server', 'started: ' + JSON.stringify(summary));
});

module.exports = server;