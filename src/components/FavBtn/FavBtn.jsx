import './FavBtn.css'

import { useContext } from 'react'

import { KudiContext } from '@context/Context'

export const FavBtn = ()=>{
    
    // Variables de entorno
    const { VITE_API} = import.meta.env

    const { users , setUsers , movie } = useContext(KudiContext)

    let user = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado

    const userLogged = users.find(eachUser => eachUser.username === user)           // Buscar el usuario logueado entre los usuarios de la bbdd
    
    const saveFav = async ()=>{

        const newFav = {                                                            // Crear el nuevo objeto con los datos a incluir
            id: userLogged._id,                                                     // Necesario el id para que la API seleccione el item a modificar
            movies_favs: [...userLogged.movies_favs , movie]
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
        console.log(newFav)
    }

    return(
        <>
        <button onClick={saveFav} className="Fav-btn Small-btn" title='Añadir a la lista'>
            <svg className='Fav-svg Small-btn--svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.85708H9.14286V-6.10352e-05H6.85714V6.85708H0V9.1428H6.85714V15.9999H9.14286V9.1428H16V6.85708Z" fill="black"/>
            </svg>
        </button>
        </>
    )
}