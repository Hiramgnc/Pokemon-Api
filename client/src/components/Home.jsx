/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, orderByName, orderByAttack, filterCreated, filterByType } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

import styles from './Home.module.css';

export default function Home() {
    const allPokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();

    //Ordenamiento
    const[order, setOrder] = useState('');

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage ] = useState(12);
    const indexOfLasPokemon = currentPage * pokemonsPerPage;
    const indexOfFirsPokemon = indexOfLasPokemon - pokemonsPerPage;
    const currentPokemon = allPokemons.slice(indexOfFirsPokemon, indexOfLasPokemon);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    //Ordenamiento
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

    //filtrado
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterTypes(e) {
        dispatch(filterByType(e.target.value))
    }


    return (
        <div className={styles.background}>
            
            <Link className={styles.btnCrear} to='/pokemon'>Crear Pokémon</Link>
            <h1>Pokémon Api</h1>

            <button onClick = {e => {handleClick(e)}}>Cargar todos los Pokémon</button>
            
            <div>
                {/* Ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético */}
                <select className={styles.select} onChange={e => handleSortName(e)}>
                    <option value="vacio">Alfabéticamente</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                {/* Ordenar por ataque */}
                <select className={styles.select} onChange={e => handleSortAttack(e)}>
                    <option className={styles.option} value="vacio">Por ataque</option>
                    <option className={styles.option} value="high">Más alto</option>
                    <option className={styles.option} value="low">Más bajo</option>
                </select>

                {/* Filtrar por tipo de pokemon */}
                <select className={styles.select} onChange={e => handleFilterTypes(e)}>
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
                <select className={styles.select} onChange={e => handleFilterCreated(e)}>
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

                <SearchBar />

                <div className={styles.cards}>
                    {
                        currentPokemon.length > 0 ? 
                        currentPokemon?.map((p) => {
                            // console.log(p)
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