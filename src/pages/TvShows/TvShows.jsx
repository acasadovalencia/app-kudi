// Importaciones
import './TvShows.css'

import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'
import { KudiContext } from '@context/Context'

import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState , useContext } from 'react'


export const TvShows = ()=>{

    const { tvshows , getTvshows } = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()

    // Effects
    useEffect(()=>{
        let login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }
        getTvshows()
    }, [])                                                             // Array vacío para que se ejecute solo al iniciar componente

    return(
        <>
        <main className="Main">
            <section className="Section Movies">
                <h2 className="Section-h2 H2">Series</h2>
                <ul className="Section-ul Movies-ul">
                    {tvshows.length == 0 && <li>Cargando...</li>}                {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                    {tvshows.length != 1 && tvshows.map( eachMovie =>                 
                        <TvShowsLi key={eachMovie._id} {...eachMovie}/>                             
                    )}
                </ul>
            </section>
        </main>
        </>
    )
}
