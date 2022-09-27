import axios from 'axios';

export function getPokemons() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/pokemon');
        return dispatch ({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

//Formulario
export function getTypes() {
    return async function(dispatch){
        let info = await axios.get('http://localhost:3001/type', {
        });
        return dispatch ({
            type: 'GET_TYPES',
            payload: info.data
        })
    }
}

export function postPokemon(payload) {
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/pokemon', payload);
        console.log(response)
        return response;
    }
}

//Detalle 
export function getDetail(id) {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/pokemon/' + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//SearchBar
export function getNamePokemons(name) {
    return async function(dispatch){
        try {
            let json = await axios.get("http://localhost:3001/pokemon?name=" + name);
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