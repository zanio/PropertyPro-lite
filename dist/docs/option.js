"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
var options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: ["application/json", "application/xml"],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        "in": 'header',
        name: 'Authorization',
        description: ""
      }
    }
  },
  basedir: __dirname,
  //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder

};
exports.options = options;