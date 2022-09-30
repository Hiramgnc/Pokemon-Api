import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNamePokemons(name))
        setName("");
    }

    return (
        <div className={styles.search}>

            <input className={styles.input}
                type="text" 
                placeholder="Buscar Pokémon..." onChange={(e) => handleInputChange(e)} 
            />
            <button className={styles.btnsearch}
                type="submit" onClick={(e) => handleSubmit(e)} >
                    🔎
            </button>

        </div>
    )
}