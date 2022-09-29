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
                    <h1>{myPokemon[0].name}</h1>
                    <img
                    src={
                        myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img
                    }
                    alt="pokemon"
                    />
                    <h2>ID: {myPokemon[0].id}</h2>
                    <h2>Vida: {myPokemon[0].hp}</h2>
                    <h2>Attaque: {myPokemon[0].attack}</h2>
                    <h2>Defensa: {myPokemon[0].defense}</h2>
                    <h2>Velocidad: {myPokemon[0].speed}</h2>
                    <h2>Altura: {myPokemon[0].height + " m"}</h2>
                    <h2>Peso: {myPokemon[0].weight + " kg"}</h2>
                    <h2>Tipo: {myPokemon[0].types?.map((e) => e.name + " ,")}</h2>
                </div>
                : <div><img src="https://i.postimg.cc/3xT7063k/Pikachu-Loading.gif" alt="loading" /></div>
            }

            <Link to='/home'>
                <button>Volver</button>
            </Link>

        </div> 
    )
}