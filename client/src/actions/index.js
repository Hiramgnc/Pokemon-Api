import axios from 'axios';

export function getPokemons () {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/pokemon');
        return dispatch ({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}