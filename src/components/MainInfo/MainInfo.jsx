// Importaciones
import './MainInfo.css'

import { useContext } from 'react'

import { KudiContext } from '@context/Context'

export const MainInfo = ()=>{

    // Contexto 
    const { movie , setMovie} = useContext(KudiContext)

    return(
        <>
        <section id='Info' className="Section Info">
            <h2 className='Section-h2 H2'>Más información</h2>
            <ul className="Info-ul">
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Idioma original</h3>
                    <span className="Info-span">{movie.language}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Subtítulos</h3>
                    <span className="Info-span">{movie.subtitle}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Dirección</h3>
                    <span className="Info-span">{movie.director}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Producción</h3>
                    <ul className="SubInfo-ul">
                        {movie.length != 0 && movie.producers.map( (eachProducer , index) =>                // Se utiliza el index del array como key 
                            <li key={index} className="SubInfo-li">{eachProducer}</li>
                        )}
                    </ul>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Reparto</h3>
                    <ul className="SubInfo-ul">
                        {movie.length != 0 && movie.cast.map( (eachCast, index) =>                         // Se utiliza el index del array como key 
                            <li key={index} className="SubInfo-li">{eachCast}</li>
                        )}
                    </ul>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Año de lanzamiento</h3>
                    <span className="Info-span">{movie.release}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Estudio</h3>
                    <span className="Info-span">{movie.company}</span>
                </li>
            </ul>
        </section>
        </>
    )
}