// Importaciones
import './TvShows.css'

import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'
import { Loader } from '@components/Loader/Loader'
import { KudiContext } from '@context/Context'

import { useNavigate } from 'react-router-dom'
import { useEffect , useContext } from 'react'


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
        window.scrollTo(0, 0)                                         // Para comenzar siempre desde el principio al cargar el componente
    }, [])                                                             // Array vacío para que se ejecute solo al iniciar componente

    return(
        <>
        <main className="Main">
            <section className="Section Tvshows">
                <h2 className="Section-h2 H2">Series</h2>
                <ul className="Section-ul Tvshows-ul">
                    {tvshows.length == 0 && 
                    <Loader/>
                    }                {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                    {tvshows.length != 1 && tvshows.map( eachTvshow =>                 
                        <TvShowsLi key={eachTvshow._id} {...eachTvshow}/>                             
                    )}
                </ul>
            </section>
        </main>
        </>
    )
}
