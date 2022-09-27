import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../actions';

//Ruta de detalle de Pokemon: debe contener
//Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
//Número de Pokemon (id)
//Estadísticas (vida, ataque, defensa, velocidad)
//Altura y peso
export default function Detail(props) {
    console.log(props)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const myPokemon = useSelector((state) => state.detail)



    return (
        <div>
            {
                myPokemon.length > 0 ?
                <div>
                    <h1>{myPokemon?.name}</h1>
                </div>
                : <p>Loading ...</p>
            }

            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div> 
        // : <div><img src="https://i.postimg.cc/3xT7063k/Pikachu-Loading.gif" alt="loading" /></div>
    )
}