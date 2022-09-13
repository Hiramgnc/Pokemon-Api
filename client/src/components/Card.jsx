import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

//Área donde se verá el listado de pokemons deberá mostrar su Imagen Nombre Tipos
export default function Card ({ image, name, type }) {
    return (
        <div className={styles.container}>

            <div className={styles.card}>
                <div className={styles.cardContainer}>

                    <img className={styles.image} src={image} alt='Imagen no disponible' />

                    <div className={styles.name}>
                        <h2>{name}</h2>
                    </div>

                    <div className={styles.type}>
                        <h4>Type: {type}</h4>
                    </div>
                    
                </div>

                <Link className={styles.link} to='/pokemon'>Ver detalle</Link>
            </div>

        </div>
    )
}