const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {

        case 'GET_POKEMONS': 
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };


        //Formulario
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }

        case 'POST_POKEMON':
            return {
                ...state,
            }

        //Detalle
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

        //Resetear detalle
        case 'RESET_DETAIL':
            return {
                ...state,
                detail: []
            }

        //SearchBar
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
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


        //Filtrar por pokemon existente o creado por nosotros
        case 'FILTER_CREATED':
            const createdFilter = action.payload === "created" 
            ? state.allPokemons.filter((e) => e.createInDb) 
            : state.allPokemons.filter((e) => !e.createInDb)
            return {
                ...state,
                pokemons: action.payload === "all" 
                ? state.allPokemons
                : createdFilter
            };


        //Filtrar por tipo de pokemon
        //Vaciar db con poke sin type
        case 'FILTER_BY_TYPE':
            //revisar el if
            const allPokemons = state.allPokemons;
            const typeFiltered = action.payload === "all" ? allPokemons 
            : allPokemons.filter(t => t.types.find(t => {
                return t.name === action.payload
                })) 

                if(!typeFiltered.length > 0) {
                    alert('No existen pokemons de ' + action.payload)
                }

                
            console.log(action.payload)
            console.log(allPokemons)
            console.log(typeFiltered)
            return {
                ...state,
                pokemons: [...typeFiltered]
            };

        default: 
        return state;
    }
}


export default rootReducer;