const url = 'http://localhost:3000/recipes';
let recipesService = fetch(url).then(resp => resp.json());

module.exports = recipesService;