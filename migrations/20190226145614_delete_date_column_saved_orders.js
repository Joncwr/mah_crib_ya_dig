
exports.up = function(knex, Promise) {
  return knex.schema.table('saved_orders', t => {
    t.dropColumn('date')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('saved_orders', t => {
    t.date('date')
  })
};
