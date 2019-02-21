const { saltHashPassword } = require('../helpers/store')
const { salt, hash } = saltHashPassword({ password: 'lolololol' })

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Jon',
          password_hash: hash,
          salt_bae: salt
        },
        {
          username: 'Jon',
          password_hash: hash,
          salt_bae: salt
        },
        {
          username: 'Jon',
          password_hash: hash,
          salt_bae: salt
        },
      ]);
    })
};
