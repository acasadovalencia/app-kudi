import './Main.css'

import { KudiContext } from '@context/Context'
import { MoviesLi } from '@components/MoviesLi/MoviesLi'
import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'

import { useContext , useState , useEffect } from 'react'
import { NavLink } from 'react-router-dom'



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
        getMovies()                                     // Obtener las peliculas y series en un effect sin depedenccias para guardarlas cuando se cree el componente
        getTvshows()
    }, [])

    useEffect(()=>{
        getMoviesLatest()                             // Obtener los diferentes arrays de peliculas y series filtradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies y tvshows tengan contenido
        getTvshowsLatest()
        getMoviesInitials()
        getTvshowsInitials()
    }, [movies , tvshows])

    // Funciones
    const getMoviesLatest = ()=>{
        const latest = movies && movies.slice(-3)           // Extraer las últimas 3 películas
        setMoviesLatest(latest)
    }

    const getTvshowsLatest = ()=>{
        const latest = tvshows && tvshows.slice(-3)         // Extraer las últimas 3 series
        setTvShowsLatest(latest)
    }

    const getMoviesInitials = ()=>{
        const initial = movies && movies.slice(0 , 9)       // Extraer las primeras 10 peliculas
        setMoviesInitials(initial)
    }

    const getTvshowsInitials = ()=>{
        const initial = tvshows && tvshows.slice(0 , 9)     // Extraer las primeras 10 series
        setTvShowsInitials(initial)
    }


    return(
        <>
        <main className="Main">
        <section className="Section Lastest">
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
        <section className="Section Initials">
            <h2 className="Section-h2 H2">Peliculas</h2>
            <ul className="Section-ul Category-ul">
                {moviesInitials.length != 0 && moviesInitials.map( eachMovie => 
                    <MoviesLi key={eachMovie._id} {...eachMovie}/>
                )}
                <li className='Categories-li'>
                    <NavLink to={`/kudi/movies`}> 
                    <picture className="Categories-picture">
                        <source srcSet="/assets/images/more-bg-280x153.webp" type='image/webp' />
                        <img src="/assets/images/more-bg-280x153.jpg" alt="Background image mosaic" className="Categories-img" width={250} height={153} />
                    </picture>
                    <div className="Span-wrapper--categories">
                        <span className="Categories-span">Ver más</span>
                    </div>
                    </NavLink>
                </li>
            </ul>
        </section>
        <section className="Section Initials">
            <h2 className="Section-h2 H2">Series</h2>
            <ul className="Section-ul Category-ul">
                {tvShowsInitials.length != 0 && tvShowsInitials.map( eachTvshows => 
                    <TvShowsLi key={eachTvshows._id} {...eachTvshows}/>
                )}
                <li className='Categories-li'>
                    <NavLink to={`/kudi/tvshows`}> 
                    <picture className="Categories-picture">
                        <source srcSet="/assets/images/more-bg-280x153.webp" type='image/webp' />
                        <img src="/assets/images/more-bg-280x153.jpg" alt="Background image mosaic" className="Categories-img" width={250} height={153} />
                    </picture>
                    <div className="Span-wrapper--categories">
                        <span className="Categories-span">Ver más</span>
                    </div>
                    </NavLink>
                </li>
            </ul>
        </section>
        </main>
        </>
    )
}

