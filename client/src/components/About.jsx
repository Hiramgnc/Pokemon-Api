import React from "react";
import { useHistory } from "react-router-dom"
import styles from "./About.module.css"

export default function About(){
    const history= useHistory();
    const handleBack=()=>{
        history.push("/home")
    }

    return(
        <div className={styles.backgroud}>
            <div className={styles.buttom}>
                <button onClick={()=>handleBack()} className={styles.button }>Volver</button>
            </div>

            <h1 className={styles.title}>SOBRE MI</h1>

            <div className={styles.container}>
                <h3 className={styles.text}>
                    Hola soy Hiram,el creador de esta App.
                    <br/><br/>
                    Hice esto como mi proyecto individual.
                    <br/><br/>
                    Soy estudiante en el bootcamp de Henry.
                    <br/><br/>
                    Fue hecho totalmente por mí, lo que significa
                    <br/><br/>
                    que desarrollé tanto el backend como el frontend.
                    <br/><br/>
                    Si estás interesado en mis habilidades, puedes
                    <br/><br/>
                    contáctarme, a través de cualquiera de mis redes sociales
                </h3>
            </div>
            
            <div className={styles.orderdiv}>

                <a rel="noreferrer" href="mailto:hiramgnc@hotmail.com">
                    <img src="https://i.postimg.cc/nLR7x0Qm/icons8-email-64.png" 
                        alt="hotmail" className={styles.hotmaillogo}/>
                </a>

                <a rel="noreferrer" href="https://ar.linkedin.com/" target="_blank">
                    <img src="https://i.postimg.cc/PxCD5YmR/icons8-linkedin-rodeado-de-c-rculo-64.png" 
                    alt="linkedin" className={styles.linkedinlogo}/>
                </a>

                <a rel="noreferrer" href="https://github.com/Hiramgnc" target="_blank">
                    <img src="https://i.postimg.cc/rp36v2gt/icons8-github-64.png" 
                    alt="github" className={styles.githublogo}/>
                </a>
            </div>

        </div>
    )
}