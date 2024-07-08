// Importaciones
import './TvShowInfo.css'

import { useContext } from 'react'

import { KudiContext } from '@context/Context'

export const TvShowInfo = ()=>{

    // Contexto 
    const { tvshow , setTvshow} = useContext(KudiContext)

    return(
        <>
        <section id='Info' className="Section Info">
            <h2 className='Section-h2 H2'>Más información</h2>
            <ul className="Info-ul">
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Idioma original</h3>
                    <span className="Info-span">{tvshow.language}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Subtítulos</h3>
                    <span className="Info-span">{tvshow.subtitle}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Dirección</h3>
                    <ul className="SubInfo-ul">
                        {tvshow.length != 0 && tvshow.director.map( (eachDirector , index) =>                // Se utiliza el index del array como key 
                            <li key={index} className="SubInfo-li">{eachDirector}</li>
                        )}
                    </ul>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Producción</h3>
                    <ul className="SubInfo-ul">
                        {tvshow.length != 0 && tvshow.producers.map( (eachProducer , index) =>                // Se utiliza el index del array como key 
                            <li key={index} className="SubInfo-li">{eachProducer}</li>
                        )}
                    </ul>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Reparto</h3>
                    <ul className="SubInfo-ul">
                        {tvshow.length != 0 && tvshow.cast.map( (eachCast, index) =>                         // Se utiliza el index del array como key 
                            <li key={index} className="SubInfo-li">{eachCast}</li>
                        )}
                    </ul>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Año de lanzamiento</h3>
                    <span className="Info-span">{tvshow.release}</span>
                </li>
                <li className="Info-li">
                    <h3 className='Info-h3 H3'>Estudio</h3>
                    <span className="Info-span">{tvshow.company}</span>
                </li>
            </ul>
        </section>
        </>
    )
}