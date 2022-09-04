const { Router } = require('express');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//https://pokeapi.co/api/v2/pokemon/1

const getApiInfo = async () => {

    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    const apiInfo = await apiUrl.data.results;
    let allPokemons = [];

    for (let i = 0; i < apiInfo.length; i++) {

        await axios.get(apiInfo[i].url).then((e) =>

            allPokemons.push({
                id: e.data.id,
                name: e.data.name,
                img: e.data.sprites.other.home.front_default,
                hp: e.data.stats[0].base_stat,
                attack: e.data.stats[1].base_stat,
                defense: e.data.stats[2].base_stat,
                speed: e.data.stats[5].base_stat,
                height: e.data.height,
                weight: e.data.weight,
                types: e.data.types.map((e) => e.type),

            })
        );
    }
    
    return allPokemons;
};


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