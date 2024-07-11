    // Importaciones
    import './Categories.css'

    import { KudiContext } from '@context/Context'

    import { useContext , useEffect } from 'react'
    import { useNavigate , NavLink } from 'react-router-dom'


    export const Categories = ()=>{

        // Contexto
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
            getCategories()                                                                           // Obtener categorías al iniciar componente
        }, [])
       
        
        return(
            <>
            <main className="Main">
                <section className="Section Categories">
                    <h2 className="Section-h2 H2">Categorías</h2>
                    <ul className="Section-ul Categories-ul">
                        {categories.length != 0 && categories.map((eachCategory , index) => 
                            <li className='Categories-li' key={index}>
                                <NavLink to={`/kudi/categories/${eachCategory}`}> 
                                <picture className="Categories-picture">
                                    <source srcSet="/assets/images/category-bg-280x153.webp" type='image/webp' />
                                    <img src="/assets/images/category-bg-280x153.jpg" alt="Background image mosaic" className="Categories-img" width={250} height={153} />
                                </picture>
                                <div className="Span-wrapper--categories">
                                    <span className="Categories-span">{eachCategory}</span>
                                </div>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </section>
            </main>
            </>
        )
    }

