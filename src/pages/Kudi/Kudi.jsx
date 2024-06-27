// Importaciones
import './Kudi.css'

import { useEffect } from 'react'

import { Header } from '@components/Header'
import { useNavigate } from 'react-router-dom'

export const Kudi = () =>{

    const navigate = useNavigate()

    // Effects
    useEffect(()=>{

        let login = JSON.parse(localStorage.getItem('user'))

        if(!login){
            navigate('/')
        }

    },[])

    return(
        <>
        <Header/>
        </>
    )
}