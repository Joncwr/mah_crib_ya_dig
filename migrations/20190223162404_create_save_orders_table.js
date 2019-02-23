
exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_orders', t => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('period').notNullable()
    t.date('date').notNullable()
    t.json('comments').nullable()
    t.integer('users_id').references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('saved_orders')
};
