
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('username').notNullable()
    t.string('password_hash').notNullable()
    t.string('salt_bae').notNullable()
    t.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
