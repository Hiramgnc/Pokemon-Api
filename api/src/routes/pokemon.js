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

    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
    const apiInfo = await apiUrl.data.results;
    let allPokemons = [];

    for (let i = 0; i < apiInfo.length; i++) {

        await axios.get(apiInfo[i].url).then((e) =>

            allPokemons.push({
                id: e.data.id,
                name: e.data.name,
                image: e.data.sprites.other.dream_world.front_default,
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
    const pokemonTotal = await getAllPokemons();

    if(name) {
        let pokemonName = pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send("No se encontro ningun Pokemon con ese nombre");
        
    } else {
        res.status(200).send(pokemonTotal);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const pokemonTotal= await getAllPokemons();

    if (id) {
        let pokemonId = pokemonTotal.filter(e => e.id == id)
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(408).json({msg: "No se encontro ese pokemon"})
    }
})

router.post('/', async (req, res) => {
    
    let {
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types,
            createInDb
        } = req.body;
    
    let pokemonCreate = await Pokemon.create({ 
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createInDb
    })

    let pokemonDb = await Type.findAll({
        where : { name : types }
    });

    pokemonCreate.addTypes(pokemonDb);

    res.send('Pokemon creado con exito');

})


module.exports = router;