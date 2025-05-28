
const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")
const form = document.querySelector(".form")
const input = document.querySelector(".input_search")

const prevButton = document.querySelector(".btn-prev")
const nextButton = document.querySelector(".btn-next")

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }

}  

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando"
    pokemonNumber.innerHTML = ""

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    }else{
        pokemonName.innerHTML = "Not found"
        pokemonNumber.innerHTML = ""
    }

    input.value = ""
}


form.addEventListener("submit", (e)=> {
    e.preventDefault()

    renderPokemon(input.value.toLowerCase())
})

renderPokemon("1")

prevButton.addEventListener("click", (e)=> {
    e.preventDefault()

    parseInt(pokemonNumber.textContent) !== 1 && renderPokemon(parseInt(pokemonNumber.textContent) - 1)
})

nextButton.addEventListener("click", (e)=> {
    e.preventDefault()

    renderPokemon(parseInt(pokemonNumber.textContent) + 1) 
})