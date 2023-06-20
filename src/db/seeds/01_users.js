const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username: 'nick', password_hash: 'yessir', city: 'Brookyln', state: 'NY', is_safe: true},
    {username: 'vick', password_hash: 'bessir', city: 'Queens', state: 'NY', is_safe: true},
    {username: 'sick', password_hash: 'lessir', city: 'Manhattan', state: 'NY', is_safe: true},
    {username: 'kick', password_hash: 'qessir', city: 'Albany', state: 'NY', is_safe: true},
    {username: 'rick', password_hash: 'essir', city: 'Los Angeles', state: 'CA', is_safe: true},
  ]);
};