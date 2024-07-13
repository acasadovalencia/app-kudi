    //Importaciones
    import './Category.css'

    import { KudiContext } from '@context/Context'
    import { MoviesLi } from '@components/MoviesLi/MoviesLi'
    import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'

    import { useContext , useState , useEffect } from 'react'
    import { useParams } from 'react-router-dom'


    export const Category = ()=>{
        //Contexto
        const { movies , getMovies , tvshows , getTvshows } = useContext( KudiContext )

        //States
        const [ moviesFiltered , setMoviesFiltered] = useState([])
        const [ tvShowsFiltered , setTvShowsFiltered] = useState([])

        // Params
        const { category } = useParams()                    // Se utiliza la categoria en la url para la búsqueda

        //Effects
        useEffect(()=>{                                         
            getMovies()                                     // Obtener las peliculas en un effect sin depedenccias para guardarlas cuando se cree el componente
            getTvshows()
        }, [])

        useEffect(()=>{
            getMoviesFiltered()                             // Obtener el array de peliculas filtradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies tenga contenido
            getTvshowsFiltered()
        }, [movies , tvshows])

        // Funciones
        const getMoviesFiltered = ()=>{
            const filter = movies && movies.filter(eachMovie => eachMovie.genre.includes(category) )
            setMoviesFiltered(filter)
        }

        const getTvshowsFiltered = ()=>{
            const filter = tvshows && tvshows.filter(eachtvshows => eachtvshows.genre.includes(category) )
            setTvShowsFiltered(filter)
        }

        return(
            <>
            <main className="Main">
            <section className="Section Category">
                <h2 className="Section-h2 H2">Género <span className="Category-span">{category}</span></h2>
                <ul className="Section-ul Category-ul">
                    {/* Sin loader porque sin no hay, no se muestra nada */}
                    {moviesFiltered.length != 0 && moviesFiltered.map( eachMovie =>                                 
                        <MoviesLi key={eachMovie._id} {...eachMovie}/>
                    )}
                    {tvShowsFiltered.length != 0 && tvShowsFiltered.map( eachTvshows => 
                        <TvShowsLi key={eachTvshows._id} {...eachTvshows}/>
                    )}
                </ul>
            </section>
            </main>
            </>
        )
    }

