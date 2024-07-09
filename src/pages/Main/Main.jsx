import './Main.css'

import { KudiContext } from '@context/Context'
import { MoviesLi } from '@components/MoviesLi/MoviesLi'
import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'

import { useContext , useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'



export const Main = ()=>{
    //Contexto
    const { movies , getMovies , tvshows , getTvshows } = useContext( KudiContext )

    //States
    const [ moviesLatest , setMoviesLatest] = useState([])
    const [ tvShowsLatest , setTvShowsLatest] = useState([])
    const [ moviesInitials , setMoviesInitials] = useState([])
    const [ tvShowsInitials , setTvShowsInitials] = useState([])


    //Effects
    useEffect(()=>{                                         
        getMovies()                                     // Obtener las peliculas en un effect sin depedenccias para guardarlas cuando se cree el componente
        getTvshows()
    }, [])

    useEffect(()=>{
        getMoviesLatest()                             // Obtener el array de peliculas filtradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies tenga contenido
        getTvshowsLatest()
        getMoviesInitials()
        getTvshowsInitials()
    }, [movies , tvshows])

    // Funciones
    const getMoviesLatest = ()=>{
        const latest = movies && movies.slice(-3)
        setMoviesLatest(latest)
    }

    const getTvshowsLatest = ()=>{
        const latest = tvshows && tvshows.slice(-3)
        setTvShowsLatest(latest)
    }

    const getMoviesInitials = ()=>{
        const initial = movies && movies.slice(0 , 9)
        setMoviesInitials(initial)
    }

    const getTvshowsInitials = ()=>{
        const initial = tvshows && tvshows.slice(0 , 9)
        setTvShowsInitials(initial)
    }


    return(
        <>
        <main className="Main">
        <section className="Section Category">
            <h2 className="Section-h2 H2">Novedades</h2>
            <ul className="Section-ul Category-ul">
                {moviesLatest.length != 0 && moviesLatest.map( eachMovie => 
                    <MoviesLi key={eachMovie._id} {...eachMovie}/>
                )}
                {tvShowsLatest.length != 0 && tvShowsLatest.map( eachTvshows => 
                    <TvShowsLi key={eachTvshows._id} {...eachTvshows}/>
                )}
            </ul>
        </section>
        <section className="Section Category">
            <h2 className="Section-h2 H2">Peliculas</h2>
            <ul className="Section-ul Category-ul">
                {moviesInitials.length != 0 && moviesInitials.map( eachMovie => 
                    <MoviesLi key={eachMovie._id} {...eachMovie}/>
                )}
            </ul>
        </section>
        <section className="Section Category">
            <h2 className="Section-h2 H2">Series</h2>
            <ul className="Section-ul Category-ul">
                {tvShowsInitials.length != 0 && tvShowsInitials.map( eachTvshows => 
                    <TvShowsLi key={eachTvshows._id} {...eachTvshows}/>
                )}
            </ul>
        </section>
        </main>
        </>
    )
}

