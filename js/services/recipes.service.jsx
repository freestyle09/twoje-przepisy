const url = "http://localhost:3000/recipes";
let recipesService = fetch(url).then(resp => resp.json());
let sendRecipe = (obj, callback) => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      callback()
    })
    .catch(err => console.log(err));
};

let reload = () => {
  return fetch(url).then(resp => resp.json());
};

module.exports = {
  recipesService,
  sendRecipe,
  reload
};
