// Importaciones
import './Kudi.css'

import { useEffect } from 'react'

import { Header } from '@components/Header/Header'
import { Movies } from '@pages/Movies/Movies'
import { BrowserRouter, Route, Routes , useNavigate } from 'react-router-dom'

export const Kudi = () =>{

    const navigate = useNavigate()                                     // Hook pasado por variable para liberar el uso en otros Hooks

    // Effects
    useEffect(()=>{

        let login = JSON.parse(localStorage.getItem('user'))           // Obtener del localStorage el resultado del login

        if(!login){                                                    // Si login no existe o falso, navega a la página de inicio para impedir acceder
            navigate('/')
        }

    },[])

    return(
        <BrowserRouter>                                               // Gestion de rutas dentro de la App para navegar entre páginas
        <>
        <Header/>
        <Routes>
            <Route path='/main' element={<Main/>}/>
            <Route path='/movies' element={<Movies/>}/>
        </Routes>
        <Movies/>
        </>
        </BrowserRouter>
    )
}