const { Model } = require('../../db')

class Orders extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../users'),
        join: {
          from: 'orders.users_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Orders;
