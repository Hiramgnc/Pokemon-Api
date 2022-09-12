import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.background}>
            <h1 className={styles.title}>Pokémon Api</h1>
            <Link to= '/home' >
                <button className={styles.button}>INGRESAR</button>
            </Link>
        </div>
    )
}