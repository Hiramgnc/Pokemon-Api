
import React from 'react';
import styles from './Paginate.module.css';

export default function Paginate({ pokemonsPerPage, allPokemons, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePrev() {
        if (currentPage > 1) {
            paginate(currentPage - 1)
        }
    }

    function handleNext() {
        if (currentPage < pageNumbers.length) {
            paginate(currentPage + 1)
        }
    }


    return(
        <nav>
            <ul className={styles.ul}>
                <button className={styles.button} onClick={(e) => handlePrev(e)}>Anterior</button>

                {pageNumbers.map(number => (
                        <li className={styles.li} key={number}>
                            <button className={styles.button} onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
                <button className={styles.button} onClick={(e) => handleNext(e)}>Siguiente</button>

            </ul>
        </nav>
    )
}