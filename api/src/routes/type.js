const { Router } = require('express');
const axios = require("axios") ;
const { Type } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {

        const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
        const types = typesApi.data.results.map((e) => e.name);
        types.map((e) => {

            Type.findOrCreate({
                where: { name: e },
            });

        });
    
        const allTypes = await Type.findAll();

        res.send(allTypes);
});


module.exports = router;