import config from 'ddd-settings'
import mongoose from 'mongoose'

const settings = config.mongo;
const makeUrl = function(mongo){
var authPart = settings.username + ':' + settings.password + '@';
var auth = settings.username ? authPart : '';
var url = 'mongodb://' + auth + mongo.host + ':' + mongo.port + '/' + mongo.db;
if(settings.slave){
    url = url + ',' + mongo.slave_host + ':' + mongo.slave_port + '/' + mongo.db + '?replicaSet=mgset-682195';
}
return url;
};

const url = makeUrl(settings);
const options = {};

mongoose.Promise = global.Promise;
mongoose.connect(url, options);

mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error',function(err){
    console.log('Mongoose error happens: ' + err);
});
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected to ' + url);
});

export default mongoose;
