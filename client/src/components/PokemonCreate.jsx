import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PokemonCreate.module.css';

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Se requiere un nombre"
    } else if (!input.hp) {
        errors.hp = "Se requiere un nivel de vida"
    }

    return errors;
};

export default function PokemonCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const type = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",  
        speed: "",
        height: "",
        weight: "",
        types: []
    })

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        // console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, {name: e.target.value}]
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Pokemon creado con exito")
        setInput({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",  
            speed: "",
            height: "",
            weight: "",
            types: []
        })
        history.push('/home')
    }

    //Eliminar select
    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(tipos => tipos !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    return (
        <div className={styles.background}>
            <Link to='/home'><button>Volver</button></Link>

                <h1 className={styles.title}>Crea tu Pokémon</h1>
                <form onSubmit={(e) => handleSubmit (e)}>

                    <div className={styles.label}>
                        <label>Nombre:</label>
                        <input 
                            type='text' 
                            value={input.name}
                            name= "name"
                            onChange={(e) => handleInputChange (e)}
                        /> 
                        { errors.name && (
                            <p className={styles.error}>{errors.name}</p>
                        )}   
                    </div>

                    <div className={styles.label}>
                        <label>Imagen:</label>
                        <input 
                            type='text' 
                            value={input.image} 
                            name="image"
                            onChange={(e) => handleInputChange (e)}
                        />
                    </div>

                    <div className={styles.label}>
                        <label>Vida:</label>
                            <input 
                                type='number' 
                                value={input.hp} 
                                name="hp"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.hp && (
                            <p className={styles.error}>{errors.hp}</p>
                        )}   
                    </div>

                    <div className={styles.label}>
                        <label>Ataque:</label>
                            <input 
                                type='number' 
                                value={input.attack} 
                                name="attack"
                                onChange={(e) => handleInputChange (e)}
                            />
                    </div>

                    <div className={styles.label}>
                        <label>Defensa:</label>
                            <input 
                                type='number' 
                                value={input.defense} 
                                name="defense"
                                onChange={(e) => handleInputChange (e)}
                            />
                    </div>

                    <div className={styles.label}>
                        <label>Velocidad:</label>
                            <input 
                                type='number' 
                                value={input.speed} 
                                name="speed"
                                onChange={(e) => handleInputChange (e)}
                            />
                    </div>

                    <div className={styles.label}>
                        <label>Altura:</label>
                            <input 
                                type='number' 
                                value={input.height} 
                                name="height"
                                onChange={(e) => handleInputChange (e)}
                            />
                    </div>

                    <div className={styles.label}>
                        <label>Peso:</label>
                            <input 
                                type='number' 
                                value={input.weight} 
                                name="weight"
                                onChange={(e) => handleInputChange (e)}
                            />
                    </div>

                    <select onChange={(e) => handleSelect (e)}>
                    <option hidden value='vacio'>Seleccione el tipo de Pokemon</option>
                        {type.map((t) => (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        ))}
                    </select>
                    <ul>
                        <li>{ input.types.map(e => e.name + " ,")}</li>
                    </ul>

                    <button type="submit">Crear Pokemon</button>

                </form>

                { input.types.map(e =>
                <div>
                    <p>{e.name}</p>
                    <button onClick={() => handleDelete(e.name)}>X</button>
                </div>)}
        </div>
    )
}