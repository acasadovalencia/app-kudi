import './FavList.css'

import { KudiContext } from '@context/Context'

import { useContext , useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const FavList = ()=>{

    const { VITE_API , user , setUser , setUsers , users , setCurrentUser , currentUser} = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()
        
    // Effects
    useEffect(()=>{
        const login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        } else {
            const username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
            const loggedUser = users.find(eachUser => eachUser.username === username)
            if( loggedUser ){
                setCurrentUser(loggedUser)
                getUser(loggedUser._id)
            }
        }
    }, [users , setCurrentUser , navigate]) 
    
    // Funciones
    const getUser = async (id)=>{
        let controller = new AbortController()
        let options = {
            method : 'get',                         // Método GET porque se piden datos
            signal: controller.signal
        }
            await fetch(`${VITE_API}/user/id/${id}` , options) // Fetch al endpoint /movie para obtener los datos
            .then(res => res.json())
            .then( data => setUser(data))             // Setear datos de la respuesta a movies
            .catch( err => console.log(err.message))    // Capturar y mostrar error
            .finally(()=> controller.abort())           // Abortar conexión con API
    }


    return(
        <>
        </>
    )
}