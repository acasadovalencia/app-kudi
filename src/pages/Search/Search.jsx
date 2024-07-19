// Importaciones
import './Search.css'


import { KudiContext } from '@context/Context'
import { MoviesLi } from '@components/MoviesLi/MoviesLi'
import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'

import { useContext , useState , useEffect } from 'react'


export const Search = ()=>{

    //Contexto
    const { movies , getMovies , tvshows , getTvshows , searchForm } = useContext( KudiContext )

    const { current: searchFormInput} = searchForm

    const searchTerms = searchFormInput['search'].value.toLowerCase()         // Pasar texto a minuscula para igualar búsquedas                      


    //States
    const [ moviesFound , setMoviesFound] = useState([])
    const [ tvShowsFound , setTvShowsFound] = useState([])


    //Effects
    useEffect(()=>{                                         
        getMovies()                                     // Obtener las peliculas en un effect sin depedenccias para guardarlas cuando se cree el componente
        getTvshows()
    }, [])

    useEffect(()=>{
        getMoviesFound()                             // Obtener el array de peliculas y series encontradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies tenga contenido, igual con tvshows y cuando los  terminos de búsqueda cambien para mostrar de nuevo
        getTvshowsFound()
    }, [movies , tvshows , searchTerms])

    // Funciones
    const getMoviesFound = ()=>{
        const filter = movies && movies.filter(eachMovie => eachMovie.title.toLowerCase().includes(searchTerms) )           // Pasar texto a minuscula para igualar búsquedas
        setMoviesFound(filter)
    }

    const getTvshowsFound = ()=>{
        const filter = tvshows && tvshows.filter(eachTvshow => eachTvshow.title.toLowerCase().includes(searchTerms) )       // Pasar texto a minuscula para igualar búsquedas
        setTvShowsFound(filter)
    }

    return(
        <>
        <main className="Main">
        <section className="Section Search">
            <h2 className="Section-h2 H2">Buscando por... <span className="Search-span">&quot;{searchTerms}&quot;</span></h2>
            <ul className="Section-ul Search-ul">
                {moviesFound.length == 0 && tvShowsFound.length == 0 && <li>No hay resultados</li>}
                {moviesFound.length != 0 && moviesFound.map( eachMovie => 
                    <MoviesLi key={eachMovie._id} {...eachMovie}/>
                )}
                {tvShowsFound.length != 0 && tvShowsFound.map( eachTvshow => 
                    <TvShowsLi key={eachTvshow._id} {...eachTvshow}/>
                )}
            </ul>
        </section>
        </main>
        </>
    )
}