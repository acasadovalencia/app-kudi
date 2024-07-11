// Importaciones
import './Play.css'

import { CloseBtn } from '@components/CloseBtn/CloseBtn'
import { KudiContext } from '@context/Context'
import { PlayStats } from '@components/PlayStats/PlayStats'

import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

export const Play = ()=>{

    const { movie , tvshow } = useContext( KudiContext )

    const [title , setTitle] = useState('')                                         // State para guardar el titulo dependiendo de la pagina

    const currentPage = useLocation()                                               // Guardamos en que punto del Router está la página para utilizar movies o tvshows dependiendo de la pagina
 
    //Effects
    useEffect(()=>{
        let currentTitle
        if(currentPage.pathname.includes('/kudi/movies')){                          // Condicional para que si en la url se posiciona como movies, guarde el titulo de la pelicula
            currentTitle = movie.title
        } else if(currentPage.pathname.includes('/kudi/tvshows')){                  // Condicional para que si la url se posiciona como tvshows, guarde el titulo de la serie
            currentTitle = tvshow.title
        }
        setTitle(currentTitle)                                                      // Guarda el titulo según la condicion cumplida
    }, [currentPage , movie.title , tvshow.title])                                  // Para reenderizar cuando cambien cualquiera de estos valores

    return(
        <>
        <div className="Play-page">
            <span className="Play-page--span">{title}</span>
            <CloseBtn/>
            <div className="Loader-wrapper">
                <div className="Loader">
                    <div className="orbe" style={{ '--index': 0 }}></div>
                    <div className="orbe" style={{ '--index': 1 }}></div>
                    <div className="orbe" style={{ '--index': 2 }}></div>
                    <div className="orbe" style={{ '--index': 3 }}></div>
                    <div className="orbe" style={{ '--index': 4 }}></div>
                </div>
            </div>
            <PlayStats/>
        </div>
        </>
    )
}