import context from '../../../app/context'
import Sequelize from 'Sequelize'

const Company = context.db.main.define('user', {
  companyName: {
    type: Sequelize.STRING
  }
})

export default Company