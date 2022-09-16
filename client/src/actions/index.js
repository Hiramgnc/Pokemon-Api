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