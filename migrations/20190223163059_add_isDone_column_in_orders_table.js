
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', t => {
    t.boolean('isDone').defaultTo(false).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', t => {
    t.dropColumn('isDone')
  })
};
