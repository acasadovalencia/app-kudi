    // Importaciones
    import './FavList.css'

    import { KudiContext } from '@context/Context'
    import { MoviesLi } from '@components/MoviesLi/MoviesLi'
    import { TvShowsLi } from '@components/TvShowsLi/TvShowsLi'

    import { useContext , useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'


    export const FavList = ()=>{

        // Contexto
        const { user , getUser , users , setCurrentUser , type , setType } = useContext( KudiContext )

        // Variables al uso
        const navigate = useNavigate()
            
        // Effects
        useEffect(()=>{
            const login = JSON.parse(localStorage.getItem('user'))                                     // Obtener del localStorage el resultado del login

            if(!login){                                                                                // Si login no existe o falso, navega a la página de inicio para impedir acceder
                navigate('/')
            } else {
                const username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
                const loggedUser = users.find(eachUser => eachUser.username === username)             // Encontrar el usuario logueado en el array de usuarios
                if( loggedUser ){                               
                    setCurrentUser(loggedUser)                                                        // Guardar en currentUser el usuario logueado
                    getUser(loggedUser._id)                                                           // Pasar a la función del fetch por parámetros el id del usuario logueado
                }
            }
        }, [users , setCurrentUser , navigate , user])                                                       // Renovar cuando cualquiera de estos elementos cambie
        
        return(
            <>
            <main className="Main">
            <div className="Type-wrapper">
                <button className={`Type-btn ${type == `all` ? `isActive` : ``}`} onClick={() => setType(`all`)}>Todo</button>
                <button className={`Type-btn ${type == `movies` ? `isActive` : ``}`} onClick={() => setType(`movies`)}>Películas</button>
                <button className={`Type-btn ${type == `tvshows` ? `isActive` : ``}`} onClick={() => setType(`tvshows`)}>Series</button>
            </div>
            <section className={`Section Favs ${type == `movies` ? `isActive` : `` || type == `all` ? `isActive` : ``}`}>
                <h2 className="Section-h2 H2">Peliculas en mi lista</h2>
                <div className="Favs-carrousel">
                    <ul className="Section-ul Favs-ul">
                        {user && user.movies_favs && user.movies_favs.length  == 0 && <li>Agrega películas a tu lista</li>}                {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                        {user && user.movies_favs && user.movies_favs.length != 0 && user.movies_favs.map( eachMovie =>                 
                            <MoviesLi key={eachMovie._id} {...eachMovie}/>                             
                        )}
                    </ul>
                </div>
            </section>
            <section className={`Section Favs ${type == `tvshows` ? `isActive` : `` || type == `all` ? `isActive` : ``}`}>
                <h2 className="Section-h2 H2">Series en mi lista</h2>
                <ul className="Section-ul Favs-ul">
                    {user && user.tvshows_favs && user.tvshows_favs.length  == 0 && <li>Agrega series a tu lista...</li>}                {/* Map para recorrer el array de películas y mostrar cada una como componente */}           
                    {user && user.tvshows_favs && user.tvshows_favs.length != 0 && user.tvshows_favs.map( eachTvshow =>                 
                        <TvShowsLi key={eachTvshow._id} {...eachTvshow}/>                             
                    )}
                </ul>
            </section>
            </main>
            </>
        )
    }