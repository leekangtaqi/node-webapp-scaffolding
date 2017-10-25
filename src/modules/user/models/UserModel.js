// import context from '../../../app/context'
// import Sequelize from 'Sequelize'
// import Company from './CompanyModel'

// const User = context.db.main.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name',
//     validate: {
//       maxLength: function(value) {
//         if(value.length < 3) {
//           throw new Error('minlength must be 3')
//         }
//       }
//     }
//   },
//   userId: {
//     type: Sequelize.STRING,
//     field: 'user_id'
//   }
// }, {
//   freezeTableName: true,
//   timestamps: true,
//   getterMethods: {
//     fullName: function(){ return this.firstName + ' ' + 'lastName' }
//   },
//   setterMethods: {
//     fullName: function(value) {
//       var names = value.split(' ');
//       this.setDataValue('firstname', names.slice(0, -1).join(' '));
//       this.setDataValue('lastname', names.slice(-1).join(' '));
//     },
//   },
//   validate: {
//     globalValidate: function(){}
//   },
//   classMethods: {
//     method1: function(){ return 'smth' }
//   },
//   instanceMethods: {
//     method2: function() { return 'foo' }
//   }
// })

// User.belongsTo(Company)

// export default User

'use strict';
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'Username is required!!'
  }
},{
  timestamps:true
})

UserSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function(doc, ret, options) {
    options.hide = options.hide || '_id __v createdAt updatedAt'
    if (options.hide) {
      options.hide.split(' ').forEach(function (prop) {
        delete ret[prop];
      })
    }
  }
})

export default mongoose.model('User', UserSchema)
