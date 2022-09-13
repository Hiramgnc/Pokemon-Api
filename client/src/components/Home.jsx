/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, orderByName, orderByAttack } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';

import styles from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    //Ordenamiento
    const[order, setOrder] = useState('');

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage ] = useState(12);
    const indexOfLasPokemon = currentPage * pokemonsPerPage;
    const indexOfFirsPokemon = indexOfLasPokemon - pokemonsPerPage;
    const currentPokemon = allPokemons.slice(indexOfFirsPokemon, indexOfLasPokemon);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect (() => {
        dispatch(getPokemons())
    },[dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }


    return (
        <div className={styles.background}>
            
            <Link className={styles.btnCrear} to='/pokemon'>Crear Pokémon</Link>
            <h1>Pokémon Api</h1>

            <button onClick = {e => {handleClick(e)}}>Cargar todos los Pokémon</button>
            
            <div>
                {/* Ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético */}
                <select onChange={e => handleSortName(e)}>
                    <option value="vacio">Alfabéticamente</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                {/* Ordenar por ataque */}
                <select onChange={e => handleSortAttack(e)}>
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

                {/* Paginado */}
                <Paginate
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginate={paginate}
                />

                <div className={styles.cards}>
                    {
                        currentPokemon.length > 0 ? currentPokemon?.map((p) => {
                            return(
                                <Card 
                                    image={p.image}
                                    name={p.name}
                                    // type={p.type}
                                    type={p.types.map(e => e.name + (' , '))}
                                    key={p.id}
                                />
                            )
                        }) :

                    <div>
                        <p className={styles.loading}>Cargando Pokemons...</p>
                        <img className={styles.gif} 
                            src="https://i.postimg.cc/63yNNxfm/pokeball.gif" 
                            alt="loading"/>
                    </div>
                    } 
                    
                </div>

            </div>

        </div>
    )
}