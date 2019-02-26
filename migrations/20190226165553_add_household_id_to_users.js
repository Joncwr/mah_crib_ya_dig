
exports.up = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.integer('household_id').references('households.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.dropColumn('household_id')
  })
};
