'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('express-async-errors');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes.ts');

var _routes2 = _interopRequireDefault(_routes);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _typeorm = require('typeorm');

require('reflect-metadata');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handler = require('./errors/handler');

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './database/connection'
(0, _typeorm.createConnection)();

_dotenv2.default.config();

const app = (0, _express2.default)();

app.use(_express2.default.json());
app.use((0, _cors2.default)());
app.use('/', _routes2.default);

app.use(_handler2.default);
app.use('/uploads', _express2.default.static(_path2.default.join(__dirname, '..', 'uploads')));
const { PORT } = process.env;

app.listen(PORT, console.log(`API - Server on PORT: ${PORT}`));

exports.default = app;