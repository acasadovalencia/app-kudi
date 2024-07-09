    import './Category.css'

    import { KudiContext } from '@context/Context'
    import { PlayBtn } from '@components/PlayBtn/PlayBtn'
    import { DeleteFavMovieBtn } from '@components/DeleteFavMovieBtn/DeleteFavMovieBtn'
    import { DeleteFavTvshowBtn } from '@components/DeleteFavTvshowBtn/DeleteFavTvshowBtn'

    import { useContext , useState , useEffect } from 'react'
    import { useNavigate , NavLink, useParams } from 'react-router-dom'
    import { Movies } from '../Movies/Movies'
    import { MoviesLi } from '../../components/MoviesLi/MoviesLi'
    import { TvShowsLi } from '../../components/TvShowsLi/TvShowsLi'



    export const Category = ()=>{

        const { VITE_API , user , setUser , users , setCurrentUser , movies , getMovies , tvshows , setMovies  , getTvshows , type , setType } = useContext( KudiContext )

        const [ moviesFiltered , setMoviesFiltered] = useState([])
        const [ tvShowsFiltered , setTvShowsFiltered] = useState([])


        const { category } = useParams()

        //Effects
        useEffect(()=>{                                         
            getMovies()                                     // Obtener las peliculas en un effect sin depedenccias para guardarlas cuando se cree el componente
            getTvshows()
        }, [])

        useEffect(()=>{
            getMoviesFiltered()                             // Obtener el array de peliculas filtradas en un effect que se ejecutará cuando movies cambie, esperando a ejecutarse a que movies tenga contenido
            getTvshowsFiltered()
            console.log
        }, [movies , tvshows])


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

