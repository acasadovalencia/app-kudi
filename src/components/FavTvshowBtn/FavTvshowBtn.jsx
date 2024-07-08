import './FavTvshowBtn.css'

import { useContext, useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'

import { KudiContext } from '@context/Context'

export const FavTvshowBtn = ()=>{

    // Contexto
    const { VITE_API , users , setUsers , tvshow } = useContext(KudiContext)

    // Params
    const { _id } = useParams()

    // States
    const [ isFav , setIsFav] = useState(false)

    let username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
    const userLogged = users.find(eachUser => eachUser.username === username)           // Buscar el usuario logueado entre los usuarios de la bbdd    


    // Effects
    useEffect(()=>{
        if( userLogged && userLogged.tvshows_favs){                                  // Doble comprobación para asegurar que existe tvshows_favs y no de error al recargar página
            setIsFav(userLogged.tvshows_favs.some(fav => fav._id === _id))
        }

    }, [users , userLogged])                                                                     // Se ejecuta cada vez que users cambia (al añadir un elemento vuelve a comprobar)

    // Funciones
    const saveFav = async ()=>{

        if(!isFav){
            const newFav = {                                                            // Crear el nuevo objeto con los datos a incluir
                id: userLogged._id,                                                     // Necesario el id para que la API seleccione el item a modificar
                tvshows_favs: [...userLogged.tvshows_favs , tvshow]
            }
    
            let controller = new AbortController()                      
            let options = {                                             
                method: 'put',                                          // Metodo PUT para actualizar el elemento
                signal: controller.signal,                              
                body: JSON.stringify(newFav),                           // Enviar por el body el objeto con los datos actualizados
                headers: {"Content-type" : "application/json"}          
            }
            await fetch(`${VITE_API}/users` , options)                
            .then(res => res.json())                                    
            .then(data => setUsers(data))                             
            .catch(err => console.log(err.message))                     
            .finally(()=> controller.abort()) 

        } else if(isFav){
            let controller = new AbortController()                                              // Crear controller del fetch
            let options = {                                                                     // Crear options del fetch
                method: 'delete',                                                               // Usar metodo delete porque eliminamos un elemento
                signal: controller.signal                                                       // Asignar signal al controller
            }
            await fetch(`${VITE_API}/users/${userLogged._id}/fav_tvshows/${_id}` , options)       // Fetch a la url utilizando el id de usuario y el id de params (elemento a eliminar)
            .then(res => res.json())                                                            // Transformar la respuesta
            .then(data => setUsers(data))                                                       // Asignar los datos a alumnos
            .catch(err => console.log(err.message))                                             // Capturar el error y enviarlo por cosola
            .finally( ()=> controller.abort() )                                                 // Abortar la conexión a la API
            }
        }  

    return(
        <>
        <button onClick={saveFav} className={`Fav-btn Small-btn ${isFav ? `Disabled-btn` : ``}`} title='Añadir a la lista'>
            <svg className='Fav-svg Small-btn--svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.85708H9.14286V-6.10352e-05H6.85714V6.85708H0V9.1428H6.85714V15.9999H9.14286V9.1428H16V6.85708Z" fill="black"/>
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" stroke="black" strokeWidth=".8" fill="black"/>
            </svg>
        </button>
        </>
    )
}