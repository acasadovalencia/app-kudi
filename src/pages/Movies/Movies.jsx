// Importaciones
import './Movies.css'

import { PlayBtn } from '@components/PlayBtn/PlayBtn'
import { KudiContext } from '@context/Context'

import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState , useContext } from 'react'


export const Movies = ()=>{

    const { VITE_API } = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()

    // States
    const [ movies , setMovies] = useState([])

    // Effects
    useEffect(()=>{
        let login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }
        getMovies()
    }, [])                                                             // Array vacío para que se ejecute solo al iniciar componente

    // Funciones
    const getMovies = async ()=>{
        let controller = new AbortController()
        let options = {
            method : 'get',                         // Método GET porque se piden datos
            signal: controller.signal
        }
        await fetch(`${VITE_API}/movies` , options) // Fetch al endpoint /movie para obtener los datos
        .then(res => res.json())
        .then( data => setMovies(data))             // Setear datos de la respuesta a movies
        .catch( err => console.log(err.message))    // Capturar y mostrar error
        .finally(()=> controller.abort())           // Abortar conexión con API

    }

    return(
        <>
        <main className="Main">
            <section className="Section Movies">
                <h2 className="Section-h2 H2">Peliculas</h2>
                <ul className="Section-ul Movies-ul">
                    {movies.length == 0 && <li>Cargando...</li>}                {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                    {movies.length != 1 && movies.map( eachMovie =>                 
                        <MoviesLi key={eachMovie._id} {...eachMovie}/>                             
                    )}
                </ul>
            </section>
        </main>
        </>
    )
}

const MoviesLi = (props)=>{

    const {_id , title , description , runtime , rating , poster} = props

    return(
        <>
        <li className="Section-li Movies-li">
            <NavLink to={`/kudi/movies/${_id}`}>                           {/* Para que aparezca el id de cada pelicula como url*/}                                 
            <picture className="Section-picture Movies-picture">
                <source srcSet={`./../assets/images/${poster.small}.webp`} alt={title} type='image/webp' />
                <img src={`./../assets/images/${poster.small}.jpg`} alt={title} className="Section-img Movies-picture" loading='lazy' width='280' height='150' />
            </picture>
            <div className="Description-wrapper">
                <PlayBtn/>
                <div className="Title-wrapper">
                    <h3 className="Movies-h3">{title}</h3>
                    <div className="Imdb-wrapper">
                        <span className="Imdb-span">{rating}</span>
                        <svg className='Imdb-icon' width="256" height="128" version="1.1" viewBox="0 0 256 128" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="16" fill="#f5c518"/><g transform="matrix(4,0,0,4,32,28)"><polygon points="0 18 5 18 5 0 0 0"/><path d="M 15.672518,0 14.553483,8.4084693 13.858201,3.8350243 C 13.65661,2.3700926 13.463247,1.0917512 13.278113,0 H 7 v 18 h 4.241635 L 11.258091,6.1138068 13.043609,18 h 3.019748 L 17.758365,5.8517865 17.770708,18 H 22 V 0 Z"/><path d="m24 18v-18h7.804559c1.764793 0 3.195441 1.4199441 3.195441 3.1766042v11.6467918c0 1.75439-1.428338 3.176604-3.195441 3.176604zm5.832248-14.7604764c-0.198326-0.1071901-0.577732-0.1588002-1.129596-0.1588002v11.8107626c0.728633 0 1.177022-0.13101 1.345167-0.40494 0.168146-0.26996 0.254375-1.000441 0.254375-2.199382v-6.9792681c0-0.8138509-0.03018-1.3339215-0.08623-1.5641817-0.05605-0.2302603-0.18108-0.3970005-0.383717-0.5041906z"/><path d="m44.429908 4.5068582h0.31961c1.795192 0 3.250482 1.4058177 3.250482 3.1380094v7.2171234c0 1.733074-1.454818 3.138009-3.250482 3.138009h-0.31961c-1.098446 0-2.069633-0.526338-2.658038-1.331726l-0.287974 1.100504h-4.483896v-17.768778h4.784326v5.7805356c0.618172-0.7703782 1.570825-1.2736774 2.645582-1.2736774zm-1.02434 8.7773578v-4.2651379c0-0.7047386-0.04524-1.1672234-0.139493-1.3801133-0.09425-0.2128898-0.470487-0.3495732-0.734393-0.3495732s-0.670889 0.1110822-0.75006 0.2982784v7.219809c0.09048 0.205549 0.478614 0.319927 0.75006 0.319927s0.666531-0.110708 0.749473-0.319927c0.08294-0.20922 0.124413-0.719421 0.124413-1.523263z"/></g></svg>                       
                    </div>
                </div>
                <span className="Movies-span">{runtime} min</span>
                <p className="Movies-paragraph">{description}</p>
            </div>
            </NavLink>
        </li>
        </>
    )
}