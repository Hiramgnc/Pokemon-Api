import React, { useEffect } from 'react';
import { useState, useeffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    useEffect (() => {
        dispatch(getPokemons())
    },[dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }


    return (
        <div>
            <Link to='/pokemon'>Crear Pokemon</Link>
            <h1>Pokemon Api</h1>
            <button onClick={e => {handleClick(e)}}>Cargar todos los Pokemon</button>
        </div>
    )
}