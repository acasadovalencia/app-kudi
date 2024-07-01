// Importaciones
import './Kudi.css'

import { useContext, useEffect } from 'react'
import { Route, Routes , useNavigate } from 'react-router-dom'

import { Header } from '@components/Header/Header'
import { Movies } from '@pages/Movies/Movies'
import { Movie } from '@pages/Movie/Movie'
import { Main } from '@pages/Main/Main'
import { Play } from '@pages/Play/Play'
import { KudiContext } from '@context/Context'

export const Kudi = () =>{

    const { users , setUsers } = useContext( KudiContext )

    const navigate = useNavigate()                                     // Hook pasado por variable para liberar su uso en otros Hooks

    // Variables de entorno
    const { VITE_API} = import.meta.env

    // Fetch
    const getUsers = async ()=>{
            let controller = new AbortController()
            let options = {
                method : 'get',                         // Método GET porque se piden datos
                signal: controller.signal
            }
            await fetch(`${VITE_API}/users` , options) // Fetch al endpoint /movie para obtener los datos
            .then(res => res.json())
            .then( data => setUsers(data))             // Setear datos de la respuesta a movies
            .catch( err => console.log(err.message))    // Capturar y mostrar error
            .finally(()=> controller.abort())           // Abortar conexión con API
            
    }

    // Effects
    useEffect(()=>{

        let login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }
        getUsers()

    },[])

    return(
        <>
        <Header/>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='movies/*' element={<Movies/>}/>
            <Route path='movies/:_id' element={<Movie/>}/>
            <Route path='movies/:_id/play' element={<Play/>}/>              
        </Routes>

        </>
    )
}