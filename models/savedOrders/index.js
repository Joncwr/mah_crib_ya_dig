const { Model } = require('../../db')

class Orders extends Model {
  static get tableName() {
    return 'saved_orders';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../users'),
        join: {
          from: 'saved_orders.users_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Orders;
