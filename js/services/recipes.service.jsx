const url = "http://localhost:3000/recipes";
let recipesService = fetch(url).then(resp => resp.json());
let sendRecipe = obj => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

module.exports = {
  recipesService,
  sendRecipe
};
