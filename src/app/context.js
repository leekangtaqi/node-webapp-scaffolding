import mongooseMain from './mongoose'
import redisMainCreator from './redis'
import Ar from '../framework/allready'
import _ from './util'
import { logger } from './logging'

const allready = new Ar()

const contextLoader = {
  readyState: 0,
  ready,
}

const context = {
  redis: {
    main: null
  },
  mongoose: {
    main: null
  },
  controllers: {},
  services: {},
  models: {},
  kvs: {}
}

export default context
export { contextLoader }

const redisMain = redisMainCreator()
context.logger = logger;
context.mongoose.main = mongooseMain;
context.redis.main = redisMain;

allready.add('redis', allready.redis(redisMain));
allready.add('mongoose', allready.mongoose(mongooseMain));

// wire modules
const modules = require('../modules').default
for (let { controllers, models, services, kvs } of _.values(modules)) {
  // register models
  if (models && Object.keys(models).length) {
    for (let [key, Inst] of _.pairs(models)) {
      if (context.models[key]) {
        throw new Error(`Failed to register the model,
        [key]=${key}, [reason]=duplicated models`)
      }
      context.models[key] = Inst; 
    }
  }
  // register services
  if (services && Object.keys(services).length) {
     for (let [key, Contrs] of _.pairs(services)) {
      if (context.services[key]) {
        throw new Error(`Failed to register the service,
        [key]=${key}, [reason]=duplicated service`)
      }
      context.services[key] = (...args) => {
        return new Contrs(context, ...args.slice(1))
      }
      // context.services[key] = new Contrs(context); 
    }
  }
  // register kvs
  if (kvs && Object.keys(kvs).length) {
     for (let [key, Contrs] of _.pairs(kvs)) {
      if (context.kvs[key]) {
        throw new Error(`Failed to register the kv,
        [key]=${key}, [reason]=duplicated kvs`)
      }
      context.kvs[key] = (...args) => {
        return new Contrs(context, ...args.slice(1))
      }
      // context.kvs[key] = new Contrs(context); 
    }
  }
  // register controllers
  if (controllers && Object.keys(controllers).length) {
    for (let [key, Contrs] of _.pairs(controllers)) {
      if (context.controllers[key]) {
        throw new Error(`Failed to register the controller,
        [key]=${key}, [reason]=duplicated controller`)
      }
      context.controllers[key.replace(/(\w)/, v => v.toLowerCase())] = new Contrs(); 
    }
  }
}

allready.ready(() => {
  const app = require('./app')
  app.ctx = context
})

function ready(callback) {
  if (contextLoader.readyState === 1) {
    return callback()
  }
  contextLoader.readyState = 1
  callback()
}