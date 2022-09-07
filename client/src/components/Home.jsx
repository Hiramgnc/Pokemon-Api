import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

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
            
            <div>
                {/* Ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético */}
                <select>
                    <option value="vacio">Alfabéticamente</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                {/* Ordenar por ataque */}
                <select>
                    <option value="vacio">Por ataque</option>
                    <option value="high">Más alto</option>
                    <option value="low">Más bajo</option>
                </select>

                {/* Filtrar por tipo de pokemon */}
                <select>
                    <option value="all">Todos los Tipos</option>
                    <option value="poison">Poison</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="fire">Fire</option>
                    <option value="psychic">Psychic</option>
                    <option value="normal">Normal</option>
                    <option value="grass">Grass</option>
                    <option value="ice">Ice</option>
                    <option value="fighting">Fighting</option>
                    <option value="electric">Electric</option>
                    <option value="ground">Ground</option>
                    <option value="dark">Dark</option>
                    <option value="flying">Flying</option>
                    <option value="bug">Bug</option>
                    <option value="steel">Steel</option>
                    <option value="water">Water</option>
                    <option value="dragon">Dragon</option>

                </select>
    

                {/* Filtrar por pokemon existente o creado por nosotros */}
                <select>
                    <option value="all">Todos los Pokemons</option>
                    <option value="api">Existentes</option>
                    <option value="created">Creados</option>
                </select>

                {
                    allPokemons?.map((e) => {
                        return(
                            <Card 
                                image={e.image}
                                name={e.name}
                                type={e.type}
                            />
                        )
                    })
                }

            </div>

        </div>
    )
}