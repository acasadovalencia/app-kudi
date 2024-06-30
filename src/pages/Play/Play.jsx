// Importaciones
import './Play.css'
import { CloseBtn } from '../../components/CloseBtn/CloseBtn'
import { useContext } from 'react'
import { KudiContext } from '@context/Context'
import { PlayStats } from '@components/PlayStats/PlayStats'

export const Play = ()=>{

    const { movie } = useContext( KudiContext )

    return(
        <>
        <div className="Play-page">
            <span className="Play-page--span">{movie.title}</span>
            <CloseBtn/>
            <div className="Loader-wrapper">
                <div className="Loader">
                    <div className="orbe" style={{ '--index': 0 }}></div>
                    <div className="orbe" style={{ '--index': 1 }}></div>
                    <div className="orbe" style={{ '--index': 2 }}></div>
                    <div className="orbe" style={{ '--index': 3 }}></div>
                    <div className="orbe" style={{ '--index': 4 }}></div>
                </div>
            </div>
            <PlayStats/>
        </div>
        </>
    )
}