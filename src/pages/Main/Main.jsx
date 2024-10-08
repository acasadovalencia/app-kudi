//Importaciones
import './Main.css'

import { KudiContext } from '@context/Context'
import { MoviesLi } from '@components/MoviesLi/MoviesLi'
import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'
import { MoviesLiLarge } from '@components/MoviesLiLarge/MoviesLiLarge'
import { TvShowsLiLarge } from '@components/TvShowsLiLarge/TvShowsLiLarge'
import { Loader } from '@components/Loader/Loader'


import { useContext , useState , useEffect } from 'react'

import { NavLink , useNavigate } from 'react-router-dom'



export const Main = ()=>{
    //Contexto
    const { movies , getMovies , tvshows , getTvshows , getUsers } = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()                                              // Asociar a una variable al no poderse declarar dentro de otro Hook.


    //States
    const [ moviesLatest , setMoviesLatest] = useState([])
    const [ tvShowsLatest , setTvShowsLatest] = useState([])
    const [ moviesInitials , setMoviesInitials] = useState([])
    const [ tvShowsInitials , setTvShowsInitials] = useState([])
    const [ slide , setSlide ] = useState(0)


    //Effects
    useEffect(()=>{

        let login = JSON.parse(localStorage.getItem('user'))            // Obtener del localStorage el resultado del login

        if(!login){                                                     // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }
        getUsers()
        getMovies()                                                     // Obtener las peliculas y series en un effect sin depedenccias para guardarlas cuando se cree el componente
        getTvshows()
        const interval = setInterval(() => {                            // Crear intervalo para repetir el avance de imagen cada 5 segundos
            setSlide((slide) => (slide >= 5 ? 0 : slide + 1))           // Se utiliza slide para pasar a la función su valor, se comprueba si es >=5 y si lo es, comienza de nuevo y si no lo es, incrementa en 1. El valor se setea en slide
        }, 5000)
        return () => clearInterval(interval)                           // Quitar intervalo al eliminar componente
    },[])

    useEffect(()=>{
        getMoviesLatest()                                               // Obtener los diferentes arrays de peliculas y series filtradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies y tvshows tengan contenido
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

    const selectSlide = (index)=>{                        // Selección de imagen
        setSlide(index)
    }
    
    const nextSlide = ()=>{                                // Pase de imagenes
        setSlide( slide + 1)
        if(slide >= 5){
            setSlide(0)
        }
    }
    
    const prevSlide = ()=>{                                // Vuelta de imagenes
        setSlide( slide - 1)

        if(slide <= 0){
            setSlide(5)
        }
    }


    return(
        <>
        <main className="Main">
        <section className="Section Latest">
            <h2 className="Section-h2 H2">Novedades</h2>
            <div className="Carrousel-container">
                <ul className="Section-ul Carrousel-ul" style={{transform: `translateX(-${ slide * (100/6)}%)`}}>
                    {moviesLatest.length == 0 && 
                     <Loader/>
                    }
                    {moviesLatest.length != 0 && moviesLatest.map( eachMovie => 
                        <MoviesLiLarge key={eachMovie._id} {...eachMovie}/>
                    )}
                    {tvShowsLatest.length == 0 && 
                     <Loader/>
                    }
                    {tvShowsLatest.length != 0 && tvShowsLatest.map( eachTvshow => 
                        <TvShowsLiLarge key={eachTvshow._id} {...eachTvshow}/>
                    )}
                </ul>
                <ul className="Carrousel-btns">
                {moviesLatest.length != 0 && moviesLatest.map( (eachMovie , index ) => 
                    <li key={eachMovie._id} className="Carrousel-li">
                        <button onClick={()=>selectSlide(index)} className={`Carrousel-btn ${slide == index ? `isActive` : ``}`} title='Seleccionar película'></button>                        {/* Se utiliza el index para hacer el translate*/}
                    </li>
                    )}
                {tvShowsLatest.length != 0 && tvShowsLatest.map( (eachTvshow , index) => 
                    <li key={eachTvshow._id} className="Carrousel-li">
                        <button onClick={()=>selectSlide(index + moviesLatest.length)} className={`Carrousel-btn ${slide == index + moviesLatest.length ? `isActive` : ``}`} title='Seleccionar serie'></button>  {/* Al ser 2 maps diferentes y repetirse los index, se suma a index las posiciones que pueda tener el map anterior para continuar la numeracion */}
                    </li>
                    )}   
                </ul>

            </div>
        </section>
        <section className="Section Initials">
            <h2 className="Section-h2 H2">Peliculas</h2>
                <ul className="Section-ul Initials-ul">
                    {moviesInitials.length == 0 && 
                    <Loader/>
                    }
                    {moviesInitials.length != 0 && moviesInitials.map( eachMovie => 
                        <MoviesLi key={eachMovie._id} {...eachMovie}/>
                    )}
                    <li className='Initials-li'>
                        <NavLink to={`/kudi/movies`}> 
                        <picture className="Initials-picture">
                            <source srcSet="/assets/images/more-bg-280x153.webp" type='image/webp' />
                            <img src="/assets/images/more-bg-280x153.jpg" alt="Background image mosaic" loading='lazy' className="Initials-img" width='250' height='153' />
                        </picture>
                        <div className="Span-wrapper--initials">
                            <span className="Initials-span">Ver más</span>
                        </div>
                        </NavLink>
                    </li>
                </ul>
        </section>
        <section className="Section Initials">
            <h2 className="Section-h2 H2">Series</h2>
            <ul className="Section-ul Initials-ul">
                {tvShowsInitials.length == 0 && 
                    <Loader/>
                }
                {tvShowsInitials.length != 0 && tvShowsInitials.map( eachTvshow => 
                    <TvShowsLi key={eachTvshow._id} {...eachTvshow}/>
                )}
                <li className='Initials-li'>
                    <NavLink to={`/kudi/tvshows`}> 
                    <picture className="Initials-picture">
                        <source srcSet="/assets/images/more-bg-280x153.webp" type='image/webp' />
                        <img src="/assets/images/more-bg-280x153.jpg" alt="Background image mosaic" loading='lazy' className="Initials-img" width={250} height={153} />
                    </picture>
                    <div className="Span-wrapper--initials">
                        <span className="Initials-span">Ver más</span>
                    </div>
                    </NavLink>
                </li>
            </ul>
        </section>
        </main>
        </>
    )
}

