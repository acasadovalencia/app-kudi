    import './Categories.css'

    import { KudiContext } from '@context/Context'
    import { PlayBtn } from '@components/PlayBtn/PlayBtn'
    import { DeleteFavMovieBtn } from '@components/DeleteFavMovieBtn/DeleteFavMovieBtn'
    import { DeleteFavTvshowBtn } from '@components/DeleteFavTvshowBtn/DeleteFavTvshowBtn'

    import { useContext , useState , useEffect } from 'react'
    import { useNavigate , NavLink } from 'react-router-dom'


    export const Categories = ()=>{

        const { VITE_API , user , setUser , users , setCurrentUser , movies , tvshows } = useContext( KudiContext )

        // Variables al uso
        const navigate = useNavigate()

        const [categories , setCategories] = useState([])

            
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
                }
            }
        }, [users , setCurrentUser , navigate])                                                       // Renovar cuando los elementos cambien
        
        useEffect(()=>{
            getCategories()
        }, [])

        // Funciones
        const getCategories = async ()=>{
            let controller = new AbortController()
            let options = {
                method : 'get',                         // Método GET porque se piden datos
                signal: controller.signal
            }
            await fetch(`${VITE_API}/categories` , options) // Fetch al endpoint /movie para obtener los datos
            .then(res => res.json())
            .then( data => setCategories(data))             // Setear datos de la respuesta a movies
            .catch( err => console.log(err.message))    // Capturar y mostrar error
            .finally(()=> controller.abort())           // Abortar conexión con API

        }

        return(
            <>
            <main className="Main">
            <section className="Section Categories">
                <h2 className="Section-h2 H2">Categorías</h2>
                <ul className="Section-ul Categories-ul">
                    {categories.length != 0 && categories.map((eachCategory , index) => 
                        <li key={index}>
                            <NavLink to={`/kudi/categories/${eachCategory}`}> 
                            {eachCategory}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </section>
        </main>
            </>
        )
    }

