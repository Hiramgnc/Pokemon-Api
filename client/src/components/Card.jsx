import React from 'react';

//Área donde se verá el listado de pokemons deberá mostrar su Imagen Nombre Tipos
export default function Card ({ image, name, type }) {
    return (
        <div>
            <img src={image} alt='Imagen no disponible' />
            <h2>{name}</h2>
            <h4>Tipo: {type}</h4>
        </div>
    )
}