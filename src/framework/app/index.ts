import * as Koa from 'koa'
import _ from './util'
import ApplicationContext from './context'
import AllReady from '../allready'
import * as Promise from 'bluebird'
import * as glob from 'glob'
import * as path from 'path'

let ar = new AllReady();

export default function decorator(app: any) {

  app.sysMembers = [];

  app.addMember = function(name: string, inst: any){
    app.sysMembers.push({name, inst})
  }

  app.ready = function(callback: Function){
    _.assert(
      app.appContext, 
      `application expected a applicationContext`)
    
    if (app.sysMembers && app.sysMembers.length) {
      for (let { name, inst } of app.sysMembers) {
        if (name === 'redis' || name === 'mongoose') {
          ar.add(name, ar[name](inst))
        } else {
          ar.add(name, inst)
        }
      }
    }

    app.ctx = {
      services: {},
      models: {}
    }
    app._wireModules(() => ar.ready(callback))
  }

  app._wireModules = function(callback: Function){
    glob(path.join(__dirname, "../../../src/modules/**/**/*.ts"), function (err, files) {
      let refinedFiles = files.map(file => {
        let arr = file.split('/')
        if (arr.length) {
          return {
            file,
            name: arr[arr.length - 1]
          }
        }
        return null
      }).filter(r => r)

      let models = refinedFiles.filter(({file, name}) => name.match(/Model/))
      if (models && models.length) {
        models.map(({file, name}) => {
          let inst = require(file).default
          app.ctx.models[name.split('.')[0]] = inst
        })
      }
      
      app.appContext.models = app.ctx.models

      let services = refinedFiles.filter(({file, name}) => name.match(/Service/))
      if (services && services.length) {
        services.map(({file, name}) => {
          let Cont = require(file).default
          let serviceInst = new Cont(app.appContext)
          app.ctx.services[name.split('.')[0]] = serviceInst
        })
      }
      
      callback()
    })
  }

  app.readyAsync = Promise.promisify(app.ready)

  return app
}