const { Model } = require('../../db')

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings () {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: require('../orders'),
        join: {
          from: 'users.id',
          to: 'orders.users_id'
        }
      },

      savedOrders: {
        relation: Model.HasManyRelation,
        modelClass: require('../savedOrders'),
        join: {
          from: 'users.id',
          to: 'saved_orders.users_id'
        }
      },

      households: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../households'),
        join: {
          from: 'users.household_id',
          to: 'households.id'
        }
      }
    }
  }
}

module.exports = Users;
