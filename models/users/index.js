const { Model } = require('../../db')
const Orders = require('../orders')

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings () {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Orders,
        join: {
          from: 'users.id',
          to: 'orders.users_id'
        }
      }
    }
  }
}

module.exports = Users;
