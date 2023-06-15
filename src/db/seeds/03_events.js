/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {id: 1, geolocation: '85, 80', description: 'yessir', title: 'kvr ek', type: 'NY', img_url: 'dkfmvdskvmdk'},
    {id: 2, geolocation: '35, 80', description: 'ressir', title: 'vjrkv', type: 'NY', img_url: 'dkfmvdskvmdk'},
    {id: 3, geolocation: '65, 20', description: 'tssir', title: 'vkre', type: 'NY', img_url: 'dkfmvdskvmdk'},
    {id: 4, geolocation: '85, 90', description: 'ressir', title: 'tkgt', type: 'NY', img_url: 'dkfmvdskvmdk'},
    {id: 5, geolocation: '83, 30', description: 'fessir', title: 'gmtkg', type: 'NY', img_url: 'dkfmvdskvmdk'},
  ]);
};
