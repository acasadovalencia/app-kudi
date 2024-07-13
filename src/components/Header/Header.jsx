// Importaciones
import './Header.css'

import { KudiContext } from '@context/Context'
import { ModalAlert } from '@components/ModalAlert/ModalAlert'

import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ProfileMenu } from '../ProfileMenu/ProfileMenu'
import { ModifyProfileMenu } from '../ModifyProfileMenu/ModifyProfileMenu'


export const Header = ()=>{

    let user = JSON.parse(localStorage.getItem('username'))                         // Guardar el nombre de usuario del localStorage para poder mostrarlo

    // Variables al uso

    const currentPage = useLocation()                                               // Guardamos en que punto del Router donde está la página para usar en estilos de CSS

    // Contexto
    const { isMenuOpen, setIsMenuOpen , setModifyModal , modifyModal } = useContext( KudiContext )

    // Funciones
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        setModifyModal(false)
    }

    return(
        <>
        <header className="Header">
            <div className="Header-wrapper">
                <NavLink to='/kudi'>
                    <h1 className="Logo-h1">kudi</h1>
                </NavLink>
                <nav className="Header-nav">
                    <ul className="Header-ul Nav">
                        <li className={`Nav-li ${currentPage.pathname == '/kudi' ? `CurrentPage` : ``}`}>                       {/* Incluimos una clase o no, según el nombre del path de la route */}
                        <NavLink to='/kudi'>Inicio</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname.includes('/kudi/categories') ? `CurrentPage` : ``}`}>
                        <NavLink to='/kudi/categories'>Categorías</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname.includes('/kudi/movies') ? `CurrentPage` : ``}`}>
                            <NavLink to='/kudi/movies'>Películas</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname.includes('/kudi/tvshows') ? `CurrentPage` : ``}`}>
                        <NavLink to='/kudi/tvshows'>Series</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname == '/kudi/favlist' ? `CurrentPage` : ``}`}>
                        <NavLink to={`/kudi/favlist`}>Mi lista</NavLink>
                        </li>
                        <li className="Nav-li">
                        <button className="Search-btn">
                            <svg className='Search-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                        </li>
                    </ul>
                </nav>
                <div onClick={toggleMenu} className={`Header-profile Profile ${isMenuOpen ? `isOpen` : `` || modifyModal ? `isOpen` : ``}`}>
                    <svg className="Profile-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg> 
                    <span className="Profile-span">{user}</span>
                </div>
            </div>
            <ProfileMenu/>
            <ModifyProfileMenu/>
            <ModalAlert/>
        </header>
        </>
    )
}