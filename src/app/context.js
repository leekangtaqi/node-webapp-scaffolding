import mongooseMain from './mongoose'
import Ar from '../framework/allready'

const allready = new Ar()

const context = {
  redis: {
    main: null
  },
  mongoose: {
    main: null
  }
}
context.mongoose.main = mongooseMain;

// wire modules
context.services = {}
context.models = {}
context.controllers = {}

allready.ready(() => {
  require('./app')
})

export default context