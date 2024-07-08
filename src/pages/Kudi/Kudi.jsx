// Importaciones
import './Kudi.css'

import { Header } from '@components/Header/Header'
import { Movies } from '@pages/Movies/Movies'
import { Movie } from '@pages/Movie/Movie'
import { TvShows } from '@pages/TvShows/TvShows'
import { TvShow } from '@pages/TvShow/TvShow'
import { Main } from '@pages/Main/Main'
import { Play } from '@pages/Play/Play'
import { FavList } from '@pages/FavList/FavList'
import { Categories } from '@pages/Categories/Categories'
import { Category } from '@pages/Category/Category'
import { KudiContext } from '@context/Context'

import { useContext, useEffect } from 'react'
import { Route, Routes , useNavigate } from 'react-router-dom'


export const Kudi = () =>{
    // Contexto
    const { getUsers , users } = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()                                     // Hook pasado por variable para liberar su uso en otros Hooks


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
            <Route path='tvshows/*' element={<TvShows/>}/>
            <Route path='tvshows/:_id' element={<TvShow/>}/>
            <Route path='tvshows/:_id/play' element={<Play/>}/>
            <Route path='favlist/*' element={<FavList/>}/>
            <Route path='categories/*' element={<Categories/>}/>    
            <Route path='categories/:category' element={<Category/>}/>              
          
        </Routes>

        </>
    )
}