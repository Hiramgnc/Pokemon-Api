const initialState = {
    pokemons: []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {

        case 'GET_POKEMONS': 
            return {
                ...state,
                pokemons: action.payload,
            };

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :

            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })

            return {
                ...state,
                pokemons: sortedArr
            };

        case 'ORDER_BY_ATTACK':
            let sortedArr2 = action.payload === 'high' ? 
                state.pokemons.sort( function (a,b) {
                    if(a.attack > b.attack){
                        return 1;
                    }
                    if(b.attack > a.attack) {
                        return -1
                    }
                        return 0;
                }) :
                state.pokemons.sort( function ( a, b) {
                    if(a.attack > b.attack){
                        return -1;
                    }
                    if(b.attack > a.attack){
                        return 1
                    }
                        return 0;
                })
            return{
                ...state,
                pokemons: sortedArr2
            };

        
        default: 
        return state;
    }
}


export default rootReducer;