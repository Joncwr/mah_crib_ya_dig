const { Model } = require('../../db')

class Orders extends Model {
  static get tableName() {
    return 'households';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: require('../users'),
        join: {
          from: 'households.id',
          to: 'users.household_id'
        }
      }
    }
  }
}

module.exports = Orders;
