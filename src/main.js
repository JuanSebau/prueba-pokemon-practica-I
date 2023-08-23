const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

// Función para obtener y mostrar un Pokémon aleatorio
function fetchRandomPokemon() {
    // Genera un número aleatorio entre 1 y 898 (cantidad total de Pokémones)
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    
    // Realiza una solicitud a la API para obtener los datos del Pokémon aleatorio
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)
        .then(res => res.json())
        .then(data => {
            // Llama a la función para crear y mostrar la tarjeta del Pokémon
            createPokemon(data);
            // llama spinner para ocultar
            spinner.style.display = "none";
        })
        .catch(error => console.error("Error fetching random Pokemon:", error));
}

// Función para obtener y mostrar varios Pokémones aleatorios
function fetchRandomPokemons(number) {
    // llama spinner para visualizar
    spinner.style.display = "block";
    // Realiza la función fetchRandomPokemon() 'number' para obtener varios Pokémones aleatorios
    for (let i = 0; i < number; i++) {
        fetchRandomPokemon();
    }
}

// Función para crear la tarjeta de un Pokémon y mostrarla en el contenedor
function createPokemon(pokemon) {
    // Crea un elemento 'div' para la tarjeta del Pokémon
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    // Crea un contenedor para la imagen del Pokémon
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    //Contenedor para las características detalladas 
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    // Crea una imagen y establece la fuente a la imagen frontal del Pokémon
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    // Agrega la imagen al contenedor de la imagen
    spriteContainer.appendChild(sprite);

    // Crea un párrafo para mostrar el número del Pokémon
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    // Crea un párrafo para mostrar el nombre del Pokémon
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;
    // Crea un Parrafo para mostrar el tipo del Pokémon
    const type = document.createElement("p");
    type.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(', ')}`;

    //Agrega evento click para mostrar o ocultar características
    card.addEventListener("click", () => {
        detailsContainer.classList.toggle("show-details");
        alert(`Número: ${pokemon.id}\nNombre: ${pokemon.name}\nTipo: ${pokemon.types.map(t => t.type.name).join(', ')}`);
    });

    // Agrega los elementos creados a la tarjeta del Pokémon
    card.appendChild(spriteContainer);
    card.appendChild(number);
    //card.appendChild(name);
    //card.appendChild(type);
    card.appendChild(detailsContainer);

    // Agrega la tarjeta del Pokémon al contenedor principal
    pokemonContainer.appendChild(card);
}

// Carga y muestra 9 Pokémones aleatorios
fetchRandomPokemons(9);





