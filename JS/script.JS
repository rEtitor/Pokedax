const pokemonName = document.querySelector('.Pokemon_name');
const pokemonNumber = document.querySelector('.Pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search'); //⬅️input de pesquisa (.input_search) = class que está no HTML

const buttonPrev = document.querySelector('.btn-prev'); // Corrigido o seletor
const buttonNext = document.querySelector('.btn-next'); // Corrigido o seletor

let searchPokemon = 398; // Inicializa com o ID do Pokémon inicial

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon }`); //⬅️Converte o nome para minúsculas

    if (APIResponse.status === 200) { //⬅️Verifica se a resposta da API é 200 (OK)
        const data = await APIResponse.json();
        return data;
    }
    return null; // Retorna null se o Pokémon não for encontrado
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'; //⬅️Enquanto o Pokémon não é carregado, vai aparecer "Loading..."
    pokemonNumber.innerHTML = ''; //⬅️Limpa o número do Pokémon
    pokemonImage.src = ''; //⬅️Limpa a imagem

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'; //⬅️Exibe a imagem do Pokémon
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || data['sprites']['front_default'];
        input.value = '';
        searchPokemon = data.id; // Atualiza o ID do Pokémon pesquisado
    } else {
        pokemonName.innerHTML = 'Not Found ;-;'; //⬅️Caso o Pokémon não seja encontrado, vai aparecer "Not Found"
        pokemonImage.style.display = 'none'; //⬅️Esconde a imagem
        pokemonNumber.innerHTML = ''; //⬅️Limpa o número do Pokémon
        pokemonImage.src = ''; //⬅️Limpa a imagem
        
    }
};

// Adiciona evento ao formulário para pesquisar Pokémon
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value); //⬅️input.value = valor que o usuário digitou no input de pesquisa
});

// Adiciona evento ao botão "Next"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // Incrementa o ID do Pokémon
    renderPokemon(searchPokemon);
});

// Adiciona evento ao botão "Prev"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1; // Decrementa o ID do Pokémon
        renderPokemon (searchPokemon);
    }
});

renderPokemon(searchPokemon); //⬅️Carrega o Pokémon inicial ao carregar a página