const moment = require('moment')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(() => {
      // Inserts seed entries
      return knex('orders').insert([
        {
          "name": "Chicken Sandwich",
          "period": "Breakfast",
          "date": moment().format(),
          "comments": {
            1: "haha"
          },
          "users_id": 21
        },
        {
          "name": "Chicken Sandwich",
          "period": "Breakfast",
          "date": moment().format(),
          "comments": {
            1: "haha"
          },
          "users_id": 21
        },
        {
          "name": "Chicken Sandwich",
          "period": "Breakfast",
          "date": moment().format(),
          "comments": {
            1: "haha"
          },
          "users_id": 21
        },
      ])
    })
};
