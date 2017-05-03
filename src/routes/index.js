import mount from '../framework/route-mounter'

export default function mountRoutes(app) {
  mount('/api', require('./api').default)(app)
}