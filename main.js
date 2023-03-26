

const generationsBtn = document.querySelectorAll('.btngen');
const typesBtn = document.querySelectorAll('.badges');
const searchInput = document.querySelector('.search');


let generations = [
    { limit: 151, offset: 0 },
    { limit: 100, offset: 151 },
    { limit: 135, offset: 251 },
    { limit: 107, offset: 386 },
    { limit: 156, offset: 493 },
    { limit: 72, offset: 649 },
    { limit: 88, offset: 721 },
    { limit: 96, offset: 809 },
    { limit: 110, offset: 905 },
];

//Fetching Pokemon data interms of id,name, and type:
const datalist = (data) => {
    document.querySelector('#pokemons').innerHTML = data.map((item) => {
        return `<div class = 'cards'>
        <img src="${item.sprites.other.dream_world.front_default}"/>
        <p>${item.id} ${item.name} <br>type: ${item.types.map(type => type.type.name)} </p></div>`
    }).join('')

}

//Pokemons based on generations using button
generationsBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${generations[i].limit}&offset=${generations[i].offset}`)
            .then(response => response.json())
            .then(json => {
                const fetches = json.results.map(item => {
                    return fetch(item.url).then(res => res.json())
                })
                Promise.all(fetches).then(res => {
                    pokeData = res;
                    datalist(pokeData)
                });
            })
    });
});




//Pokemon types function

const pokemonType = (pokeType) => {
    let typeData = [];
    if (pokeData.length > 0 && pokeType.length > 0) {
        typeData = pokeData.filter((item) => {
            return item.types.some((type) => type.type.name === pokeType);
        });
        datalist(typeData);
    } else {
        datalist(pokeData);
    }
};



//Pokemon types using button

typesBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const nameofType = btn.textContent.toLowerCase();
        pokemonType(nameofType);
    });
});



//Pokemon search 

function searchPokemon() {
    let input = document.querySelector('#search-bar').value
    input = input.toLowerCase();
    let x = document.querySelectorAll('.cards');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";
        }
    }
}


searchInput.addEventListener('keyup', searchPokemon);