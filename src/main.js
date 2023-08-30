// Selecciona el contenedor de los Pokémon y el spinner
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

// Obtiene y muestra un Pokémon aleatorio
function fetchRandomPokemon() {
// Genera un número aleatorio para el ID del Pokémon
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    
// Realiza una solicitud a la API para obtener los datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)
        .then(res => res.json())
        .then(data => {
            // Crea y muestra la tarjeta del Pokémon
            createPokemonCard(data);
            // Oculta el spinner después de cargar
            hideSpinner();
        })
        .catch(error => console.error("Error fetching random Pokemon:", error));
}

// Obtiene y muestra varios Pokémon aleatorios
function fetchRandomPokemons(number) {
    // Muestra el spinner
    showSpinner();
    // Obtiene y muestra varios Pokémon aleatorios
    for (let i = 0; i < number; i++) {
        fetchRandomPokemon();
    }
}
// Crea la tarjeta de un Pokémon y la muestra en el contenedor
function createPokemonCard(pokemon) {
    // Crea elementos para la tarjeta del Pokémon
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

// Agrega imágenes, números, detalles, etc.
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = capitalizeFirstLetter(pokemon.name);

    const type = document.createElement("p");
    type.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(', ')}`;

    card.addEventListener("click", () => {
        detailsContainer.classList.toggle("show-details");
        showPokemonAlert(pokemon);
    });

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(detailsContainer);

    pokemonContainer.appendChild(card);
}

// Capitaliza la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Muestra una alerta con detalles del Pokémon
    function showPokemonAlert(pokemon) {
        const firstTypeColor = getTypeColor(pokemon.types[0].type.name);
        const secondTypeColor = getTypeColor(pokemon.types[1]?.type.name);
        const statsHtml = pokemon.stats.map(stat => {
            return `<p>${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</p>`;
        }).join('');
        Swal.fire({
            title: "Información del Pokémon",
            html: `
            <div class="pokemon-alert">
                <div class="pokemon-header">
                    <p><strong># ${pokemon.id.toString().padStart(3, '0')}</strong></p>
                    <img src="${pokemon.sprites.front_default}" alt="Imagen del Pokémon" class="pokemon-image">
                </div>
                <div class="pokemon-details">
                    <p><strong>${capitalizeFirstLetter(pokemon.name)}</strong></p>
                    <p> <span class="type" style="background-color: ${firstTypeColor};">${capitalizeFirstLetter(pokemon.types[0].type.name)}</span> <span class="type" style="background-color: ${secondTypeColor};">${capitalizeFirstLetter(pokemon.types[1]?.type.name || '')}</span></p>
                </div>
                <div class="pokemon-stats">
                    <p><strong>Estadísticas</strong></p>
                    ${statsHtml}
                </div>
            </div>`,
            
        });
    }

// Obtiene el color correspondiente al tipo de Pokémon
function getTypeColor(type) {
    // Devuelve el color correspondiente al tipo
     const typeColors = {
        flying:"blue",
        ice:"blue",
        water:"blue",
        fire: "red",
        dragon: "red",
        fighting: "yellow",
        electric: "yellow",
        fairy: "yellow",
        grass: "green",
        poison: "green",
        bug: "green",
        psychic: "purple",
        rock: "brown",
        ground: "brown",
        steel: "gray",
        ghost: "gray",            
    };
    
    // Devuelve el color correspondiente al tipo
        return typeColors[type] || "black"; // Negro como color predeterminado
    }
    // Muestra el spinner
function showSpinner() {
    spinner.style.display = "block";
    }
    // Oculta el spinner
function hideSpinner() {
        spinner.style.display = "none";
    }
// Carga y muestra 6 Pokémones aleatorios al cargar la página
    fetchRandomPokemons(9);






