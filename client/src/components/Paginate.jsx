import React from 'react';
import styles from './Paginate.module.css';

export default function Paginate({ pokemonsPerPage, allPokemons, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.ul}>

                {pageNumbers.map(number => (
                    <li className={styles.li} key={number}>
                        <button className={styles.button} onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}

            </ul>
        </nav>
    )
}