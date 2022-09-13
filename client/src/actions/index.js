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