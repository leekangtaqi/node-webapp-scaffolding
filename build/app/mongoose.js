'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = _config2.default.mongo;
var mongoose = require('mongoose');
var makeUrl = function makeUrl(mongo) {
    var authPart = settings.username + ':' + settings.password + '@';
    var auth = settings.username ? authPart : '';
    //mongodb://vmark: t2f0sovjsq2@dds-2ze2d24974dce3542.mongodb.rds.aliyuncs.com:3717,dds-2ze2d24974dce3541.mongodb.rds.aliyuncs.com:3317/vmark?replicaSet=mgset-682195
    var url = 'mongodb://' + auth + mongo.host + ':' + mongo.port + '/' + mongo.db;
    if (settings.slave) {
        url = url + ',' + mongo.slave_host + ':' + mongo.slave_port + '/' + mongo.db + '?replicaSet=mgset-682195';
    }
    //return 'mongodb://' + auth + mongo.host + ':' + mongo.port + '/' + mongo.db + '?replicaSet=mgset-682195';
    return url;
};

var url = makeUrl(settings);
var options = {};

mongoose.connect(url, options);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose error happens: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected to ' + url);
});

exports.default = mongoose;