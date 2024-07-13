// Importaciones
import './DeleteFavTvshowBtn.css'

import { KudiContext } from '@context/Context'

import { useContext  } from 'react'

export const DeleteFavTvshowBtn = (props)=>{
    
    const {_id} = props                                                                 // Id del Li donde está el botón

    // Contexto
    const { VITE_API , users , setUsers , movie } = useContext(KudiContext)

    // States
    let username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
    const userLogged = users.find(eachUser => eachUser.username === username)           // Buscar el usuario logueado entre los usuarios de la bbdd    

    // Funciones
    const deleteFav = async ()=>{

            let controller = new AbortController()                                              // Crear controller del fetch
            let options = {                                                                     // Crear options del fetch
                method: 'delete',                                                               // Usar metodo delete porque eliminamos un elemento
                signal: controller.signal                                                       // Asignar signal al controller
            }
            await fetch(`${VITE_API}/users/${userLogged._id}/fav_tvshows/${_id}` , options)     // Fetch a la url utilizando el id de usuario y el id de las props (elemento Li a eliminar)
            .then(res => res.json())                                                            // Transformar la respuesta
            .then(data => setUsers(data))                                                       // Asignar los datos a usuarios
            .catch(err => console.log(err.message))                                             // Capturar el error y enviarlo por cosola
            .finally( ()=> controller.abort() )                                                 // Abortar la conexión a la API
            
        }  

    return(
        <>
        <button onClick={deleteFav} className={`DeleteFav-btn Small-btn`} title='Eliminar de la lista'>
            <svg className="DeleteFav-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
        </>
    )
}