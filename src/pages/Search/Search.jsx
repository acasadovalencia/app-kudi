// Importaciones
import './Search.css'

import { KudiContext } from '@context/Context'

import { useContext, useEffect } from 'react'


export const Search = ()=>{

    // Contexto
    const { searchForm } = useContext(KudiContext)

    //Deconstrucción de los datos de búsqueda
    const { current: searchFormInput } = searchForm

    const searchTerms = searchFormInput['search'].value

    useEffect(()=>{
        console.log(searchTerms)
    },[searchTerms])

    return(
        <>
        <h1>Soy busqueda</h1>
        </>
    )
}