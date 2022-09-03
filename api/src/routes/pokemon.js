const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{

    try{
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            const result = apiUrl.data.results.map(e=>  axios.get(e.url))
                //Result es un array con los resultados de la segunda consulta
                let apiInfo = Promise.all(result) //Guardo la promesa para retornarla
                    //Este e es un array con los objetos data de la respuesta axios 
                    .then(e=> {
                        let pokemon = e.map(e=> e.data) //Crea un array con los objetos pokemon
                        let arrPokemons = []
                        pokemon.map(e => {
                            arrPokemons.push({
                                id: e.id,
                                name : e.name,
                                image: e.sprites.other.dream_world.front_default,
                                hp: e.stats[0].base_stat,
                                attack: e.stats[1].base_stat,
                                defense: e.stats[2].base_stat,
                                speed: e.stats[5].base_stat,
                                height: e.height,
                                weight: e.weight,
                                types: e.types.length < 2 
                                    ? [e.types[0].type.name]
                                    : [e.types[0].type.name, e.types[1].type.name]
                                })
                        })
                        return arrPokemons
                    })
                return apiInfo

    }catch(err){
        console.log(err)
    }
}    

module.exports = router;