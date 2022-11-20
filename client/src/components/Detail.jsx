import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail, resetDetail, deletePokemon } from '../actions';
import styles from './Detail.module.css';

//Ruta de detalle de Pokemon: debe contener
//Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
//Número de Pokemon (id)
//Estadísticas (vida, ataque, defensa, velocidad)
//Altura y peso
export default function Detail(props) {
    console.log(props)

    const dispatch = useDispatch();
    //Delete
    const id = props.match.params.id
    let history = useHistory()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        //Funcion que se ejecuta cuando se desmonta el componente
        return () => {dispatch(resetDetail())}

    }, [dispatch, props.match.params.id]);

    const myPokemon = useSelector((state) => state.detail)

    //Delete
    function handleDelete (e) {
        dispatch(deletePokemon(e.target.value))
        history.push('/home')
    }    


    return (
        <div className={styles.background}>

            <div className={styles.container}>

            {
                myPokemon.length > 0 ?
                <div>
                    <h1 className={styles.name}>{myPokemon[0].name}</h1>
                    <img className={styles.image}
                    src={
                        myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img
                    }
                    alt="pokemon"
                    />
                    <h3 className={styles.titles}>ID: {myPokemon[0].id}</h3>
                    <h3 className={styles.titles}>Vida: {myPokemon[0].hp}</h3>
                    <h3 className={styles.titles}>Attaque: {myPokemon[0].attack}</h3>
                    <h3 className={styles.titles}>Defensa: {myPokemon[0].defense}</h3>
                    <h3 className={styles.titles}>Velocidad: {myPokemon[0].speed}</h3>
                    <h3 className={styles.titles}>Altura: {myPokemon[0].height + " m"}</h3>
                    <h3 className={styles.titles}>Peso: {myPokemon[0].weight + " kg"}</h3>
                    <h3 className={styles.titles}>Tipo: {myPokemon[0].types?.map((e) => e.name + " ,")}</h3>
                </div>
                : <div>
                <p className={styles.loading}>Cargando detalles...</p>
                <img className={styles.gif} 
                    src="https://i.postimg.cc/3xT7063k/Pikachu-Loading.gif"
                    alt="loading"/>
                </div>
                // <div className={styles.loading}><img src="https://i.postimg.cc/3xT7063k/Pikachu-Loading.gif" alt="loading" /></div>

            }

            </div>

            {/* Delete */}
            { id.length > 7 ?
                <div>
                    <button className={styles.delete} 
                    value={id} onClick={e => handleDelete(e)}>Eliminar Pokémon</button>
                </div> :
                null
            }

            <Link to='/home'>
                <button className={styles.button}>Volver</button>
            </Link>

        </div> 
    )
}