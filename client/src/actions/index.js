import axios from 'axios';
const ROOT = "https://pokemon-api-production.up.railway.app";

export function getPokemons() {
    return async function(dispatch) {
        // let json = await axios.get('http://localhost:3001/pokemon');
        let json = await axios.get(`${ROOT}/pokemon`);
        return dispatch ({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

//Formulario
export function getTypes() {
    return async function(dispatch){
        // let info = await axios.get('http://localhost:3001/type', {
        let info = await axios.get(`${ROOT}/type` , {
        });
        return dispatch ({
            type: 'GET_TYPES',
            payload: info.data
        })
    }
}

export function postPokemon(payload) {
    return async function(dispatch){
        // const response = await axios.post('http://localhost:3001/pokemon', payload);
        const response = await axios.post(`${ROOT}/pokemon`, payload);
        console.log(response)
        return response;
    }
}

//Detalle 
export function getDetail(id) {
    return async function(dispatch){
        try {
            // let json = await axios.get(`http://localhost:3001/pokemon/${id}`);
            let json = await axios.get(`${ROOT}/pokemon/${id}`);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//Resetea
//Objeto vacio para resetear
export function resetDetail() {
    return {
        type: 'RESET_DETAIL',
        payload: {}
    }
}

//SearchBar
export function getNamePokemons(name) {
    return async function(dispatch){
        try {
            // let json = await axios.get("http://localhost:3001/pokemon?name=" + name);
            let json = await axios.get(`${ROOT}/pokemon?name=` + name);
            return dispatch ({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            alert('No se encontraron resultados');
        }
    }
}

//Ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

//Ordenar por ataque
export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

//Filtrar por pokemon existente o creado por nosotros
export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


//Filtrar por tipo de pokemon
export function filterByType(payload) {
    console.log(payload)
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

//Delete
export function deletePokemon(payload) {
    axios
        // .delete("http://localhost:3001/pokemon/delete/" + payload)
        .delete(`${ROOT}/pokemon/delete/` + payload)
        .catch((err) => console.log(err.message));
    return {
        type: 'DELETE_POKEMON',
        payload,
    };
}