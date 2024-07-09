    import './Categories.css'

    import { KudiContext } from '@context/Context'

    import { useContext , useState , useEffect } from 'react'
    import { useNavigate , NavLink } from 'react-router-dom'


    export const Categories = ()=>{

        const { users , setCurrentUser , getCategories , categories } = useContext( KudiContext )

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
                }
            }
        }, [users , setCurrentUser , navigate])                                                       // Renovar cuando los elementos cambien
        
        useEffect(()=>{
            getCategories()
        }, [])
       
        
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

