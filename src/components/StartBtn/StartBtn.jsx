// Importaciones
import './StartBtn.css'

import { useLocation, useNavigate } from 'react-router-dom'

export const StartBtn = ()=>{

    const navigate = useNavigate()

    const currentPage = useLocation()               // Obtener la pagina actual para cambiar el nombre del boton en funcion de

    return(
        <>
        <button onClick={()=> navigate('play')} className="Btn-play" title='Reproducir película'>
            <svg className='Btn-play--svg' width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="24" />
                <path d="M15 33.5873C15 35.9436 17.5919 37.3801 19.59 36.1313L34.9296 26.544C36.8096 25.369 36.8096 22.631 34.9296 21.456L19.59 11.8687C17.5919 10.6199 15 12.0564 15 14.4127V33.5873Z"/>
            </svg>
            {currentPage.pathname.includes('movies') && 'Reproducir película' || currentPage.pathname.includes('tvshows') && 'Comenzar serie'  }
        </button>
        </>
    )
}