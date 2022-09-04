const { Router } = require('express');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//https://pokeapi.co/api/v2/pokemon/1
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
                                })
                        })
                        return arrPokemons
                    })
                return apiInfo

    }catch(err){
        console.log(err)
    }
}    


const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);

    return infoTotal
}

router.get('/', async (req, res) => {
    const name = req.query.name;
    let pokemonTotal = await getAllPokemons();

    if(name) {
        let pokemonName = await getAllPokemons.filter(e => e.name.toLowerCase().include(name.toLowerCase()));

        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send("No se encontro ningun Pokemon con ese nombre");
    } else {
        res.status(200).send(pokemonTotal);
    }
})


module.exports = router;