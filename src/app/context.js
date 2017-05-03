import mongooseMain from './mongoose'

const context = {
  redis: null,
  mongoose: {
    main: null
  }
}
context.mongoose.main = mongooseMain;

export default context