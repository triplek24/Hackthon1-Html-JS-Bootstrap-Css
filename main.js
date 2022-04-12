const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

async function fetchPokemon(id) {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
        console.log(data);
      });
  }
  catch (error) {
    console.log("error", error);
  }

}

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;


  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  let wh = document.createElement("p")
  wh.classList.add("weight");
  wh.textContent = `weight:${pokemon.weight} height:${pokemon.height}`;
let moves =document.createElement("p");
moves.classList.add("move");
pokemon.types.map(type=>(
  moves.innerHTML = `<li key=${type.slot}>${type.type.name}</li>`
))
//diplay the Type of the Pokemon etc... Poison,water,Heat
  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(moves)



  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");
  cardBack.appendChild(progressBars(pokemon.stats));
  cardBack.appendChild(wh);
  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);


}

function progressBars(stats) {
  //Display the pokemon’s moves.etc...Attack and Defence
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    //  const weight=document.createElement("p");
    //  weight.textContent = stat.weight

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    //progressBar.setAttribute("aria-valuenow",stat.weight);
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;
    //progress.textContent = stat.weight;
    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);

    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }


  return statsContainer;
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);



























