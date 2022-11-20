import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PokemonCreate.module.css';

function validate(input) {
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;

    if (!input.name) {
        errors.name = 'Se requiere un nombre'
    } 
    if (!RegExpression.test(input.name)) {
        errors.name = 'No se permiten números ni caracteres especiales'
    }
    if (input.name.length > 20) {
        errors.name = `El nombre no puede tener más de 20 caracteres`
    }
    
    if (input.hp < 1 || input.hp > 100) {
        if (input.hp < 1) {
            errors.hp = 'La vida del Pokémon debe ser superior a 1'
        }
        if (input.hp > 100) {
            errors.hp = 'La vida del Pokémon debe ser inferior a 100'
        }
    }
    
    if (input.attack < 1 || input.attack > 100) {
        if (input.attack < 1) {
            errors.attack = 'El ataque del Pokémon debe ser superior a 1'
        }
        if (input.attack > 100) {
            errors.attack = 'El ataque del Pokémon debe ser inferior a 100'
        }
    }

    if (input.defense < 1 || input.defense > 110) {
        if (input.defense < 1) {
            errors.defense = 'La defensa del Pokémon debe ser superior a 1'
        }
        if (input.defense > 110) {
            errors.defense = 'La defensa del Pokémon debe ser inferior a 110'
        }
    }

    if (input.speed < 1 || input.speed > 110) {
        if (input.speed < 1) {
            errors.speed = 'La velocidad del Pokémon debe ser superior a 1'
        }
        if (input.speed > 110) {
            errors.speed = 'La velocidad del Pokémon debe ser inferior a 110'
        }
    }

    if (input.height < 1 || input.height > 100) {
        if (input.height < 1) {
            errors.height = 'La altura del Pokémon debe ser superior a 1'
        }
        if (input.height > 100) {
            errors.height = 'La altura del Pokémon debe ser inferior a 100'
        }
    }

    if (input.weight < 1 || input.weight > 1000) {
        if (input.weight < 1) {
            errors.weight = 'El peso del Pokémon debe ser superior a 1'
        }
        if (input.weight > 1000) {
            errors.weight = 'El peso del Pokémon debe ser inferior a 1000'
        }
    }


    if (!input.types.length) {
        errors.types = 'Debe elegir al menos un tipo de Pokémon'
    } 
    if (input.types.length > 2) {
        errors.types = `No puedes elegir más de 2 tipos por Pokémon`
    }   

    return errors;
};

export default function PokemonCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const type = useSelector((state) => state.types);

    const [errors, setErrors] = useState({});

    const [button,setButton] = useState(true);

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

    //https://i.postimg.cc/43gpFW3d/Tony-removebg-preview.png
    function handleSelect(e) {
        //Validar si lo tiene, recorrer array .find
        const typeFounded = input.types.find((type) => {
            return type.name === e.target.value
        })
        console.log(typeFounded)

        if (!typeFounded) {
            setInput({
                ...input,
                types: [...input.types, {name: e.target.value}]
            })
        }
        // setInput({
        //     ...input,
        //     types: [...input.types, {name: e.target.value}]
        // })
        // console.log(input)

        if( input.name === ''  || 
            input.hp === '' || 
            input.attack === '' || 
            input.defense === '' || 
            input.height === '' || 
            input.weight === '' || 
            input.types.length < 0){
            setButton(true)

        }else{
            setButton(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (input.name === "") {
            alert('Por favor complete todos los campos correctamente')
        } else if (input.types === "") {
            alert('Por favor complete todos los campos correctamente')
        } else if (input.types.length >= 3) {
            alert('Por favor complete todos los campos correctamente')
        } else {
            dispatch(postPokemon(input))
            alert('Pokémon creado con exito')
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
            <Link to='/home'><button className={styles.btnVol}>Volver</button></Link>

                <h1 className={styles.title}>Crea tu Pokémon</h1>
                <form onSubmit={(e) => handleSubmit (e)}>

                    <div className={styles.label}>
                        <label>Nombre:</label>
                        <input 
                            type='text' 
                            value={input.name}
                            name= "name"
                            placeholder="Nombre del pokemon"
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
                                placeholder="Entre 1 y 100"
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
                                placeholder="Entre 1 y 100"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.attack && (
                            <p className={styles.error}>{errors.attack}</p>
                        )}   
                    </div>

                    

                    <div className={styles.label}>
                        <label>Defensa:</label>
                            <input 
                                type='number' 
                                value={input.defense} 
                                name="defense"
                                placeholder="Entre 1 y 100"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.defense && (
                            <p className={styles.error}>{errors.defense}</p>
                        )}   
                    </div>

                    <div className={styles.label}>
                        <label>Velocidad:</label>
                            <input 
                                type='number' 
                                value={input.speed} 
                                name="speed"
                                placeholder="Entre 1 y 100"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.speed && (
                            <p className={styles.error}>{errors.speed}</p>
                        )}   
                    </div>

                    <div className={styles.label}>
                        <label>Altura:</label>
                            <input 
                                type='number' 
                                value={input.height} 
                                name="height"
                                placeholder="Entre 1 y 100"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.height && (
                            <p className={styles.error}>{errors.height}</p>
                        )}   
                    </div>

                    <div className={styles.label}>
                        <label>Peso:</label>
                            <input 
                                type='number' 
                                value={input.weight} 
                                name="weight"
                                placeholder="Entre 1 y 100"
                                onChange={(e) => handleInputChange (e)}
                            />
                            { errors.weight && (
                            <p className={styles.error}>{errors.weight}</p>
                        )}   
                    </div>

                    <select className={styles.select} onChange={(e) => handleSelect (e)}>
                    <option hidden value='vacio'>Seleccione el tipo de Pokemon</option>
                        {type.map((t) => (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        ))}
                    </select>

                    <ul>
                        <li>{ input.types.map(e => e.name + " ,")}</li>
                    </ul>
                    { errors.types && (
                            <p className={styles.error}>{errors.types}</p>
                            )
                    }

                    <button className={styles.btnCrear} type="submit" disabled={button}>Crear Pokémon</button>

                </form>

                { input.types.map(e =>
                <div className={styles.containerDelete}>
                    <p className={styles.typeDelete}>{e.name}</p>
                    <button className={styles.buttonDelete} onClick={() => handleDelete(e)}>X</button>
                </div>)}
        </div>
    )
}

//https://i.postimg.cc/HkQHKFHr/Poke-Barney.png
//https://i.postimg.cc/Zq4ZhjKV/PokeBart.png
//https://i.postimg.cc/pdCvV8mx/Poke-Homer.png
//https://i.postimg.cc/fLbNVLdd/PokeM.png