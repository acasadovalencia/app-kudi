// Importaciones
import './PlayStats.css'

import { KudiContext } from '@context/Context'

import { useContext, useEffect , useState } from 'react'
import { useLocation } from 'react-router-dom'

export const PlayStats = ()=>{

    const currentPage = useLocation()                                               // Guardamos en que punto del Router está la página para utilizar movies o tvshows dependiendo de la pagina

    // Contextos
    const { movie , tvshow } = useContext( KudiContext )

    // State
    const [formatTime , setFormatTime] = useState('')

    // Funciones
    const minConverter = (runtime) =>{                             // Funcion conversora de minutos a formato hh:mm:ss

        const formatNum = (num) => String(num).padStart(2 , '0')   // Funcion para insertar un segundo digito (0) si es menos de 2. El num sera el resultado de cada conversion de minutos a formato hora

        let hours = formatNum(Math.floor(runtime / 60))            // Obtener cuantas  horas son X minutos dentro de la función que formatea el número
        let minutes = formatNum(runtime % 60 )                     // Obtener cuantos minutos restan a la división anterior dentro de la función que formatea el número
        let seconds = formatNum(0)                                 // 0 al no disponer de segundos
        
        return `${hours}:${minutes}:${seconds}`                    // Devuelve cada valor formateado
    }

    useEffect(()=>{
        let runtime
        if(currentPage.pathname.includes('kudi/movies')){
            runtime = movie.runtime
        } else if(currentPage.pathname.includes('kudi/tvshows')){
            runtime = tvshow.runtime
        } else {
            runtime = 0
        }
        
        const time = minConverter(runtime)
        setFormatTime(time)
    }, [currentPage.pathname , movie.runtime , tvshow.runtime])


    return(
        <>
        <div className="Play-stats">
            <div className="Svg-wrapper">
                <svg className='Play-stats--svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
            </div>
            <span className="Play-stats--span"><span className="Char-disabled">00:00:00</span> / {formatTime}</span>
        </div>   
        </>
    )
}