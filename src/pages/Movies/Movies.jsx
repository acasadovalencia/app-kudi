// Importaciones
import './Movies.css'

import { MoviesLi } from '@components/MoviesLi/MoviesLi'
import { Loader } from '@components/Loader/Loader'
import { KudiContext } from '@context/Context'

import { useNavigate } from 'react-router-dom'
import { useEffect , useContext } from 'react'

export const Movies = ()=>{

    //Contexto
    const { movies , getMovies } = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()

    // Effects
    useEffect(()=>{
        let login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }
        getMovies()
        window.scrollTo(0, 0)                                          // Para comenzar siempre desde el principio al cargar el componente
    }, [])                                                             // Array vacío para que se ejecute solo al iniciar componente


    return(
        <>
        <main className="Main">
            <section className="Section Movies">
                <h2 className="Section-h2 H2">Peliculas</h2>
                <ul className="Section-ul Movies-ul">
                    {movies.length == 0 &&
                    <Loader/>
                    }                
                    {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                    {movies.length != 1 && movies.map( eachMovie =>                 
                        <MoviesLi key={eachMovie._id} {...eachMovie}/>                             
                    )}
                </ul>
            </section>
        </main>
        </>
    )
}
