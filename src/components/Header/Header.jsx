// Importaciones
import './Header.css'

import { KudiContext } from '@context/Context'
import { ModalAlert } from '@components/ModalAlert/ModalAlert'
import { ProfileMenu } from '@components/ProfileMenu/ProfileMenu'
import { ModifyProfileMenu } from '@components/ModifyProfileMenu/ModifyProfileMenu'


import { useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


export const Header = ()=>{

    let user = JSON.parse(localStorage.getItem('username'))                         // Guardar el nombre de usuario del localStorage para poder mostrarlo

    // Variables al uso

    const currentPage = useLocation()                                               // Guardamos en que punto del Router donde está la página para usar en estilos de CSS

    const navigate = useNavigate()

    // Contexto
    const { isMenuOpen, setIsMenuOpen , setModifyModal , modifyModal , isSearchOpen, setIsSearchOpen , searchForm} = useContext( KudiContext )

    // Funciones
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        setModifyModal(false)
    }

    const toggleSearch = () =>{
        setIsSearchOpen(!isSearchOpen)
    }
    
    const searchElements = (e) =>{
        e.preventDefault()
        navigate('/kudi/search')
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
                        <button onClick={toggleSearch} className={`Search-btn ${isSearchOpen ? `isActive` : ``}`}>
                            <svg className='Search-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                        </li>
                        <li className={`Nav-li ${isSearchOpen ? `isOpen` : ``}`}>
                            <form ref={searchForm} onSubmit={searchElements} className='Nav-form'>
                                <label className='Nav-label' htmlFor="search"></label>
                                <input className='Nav-input' type="text" name='search' id='search' placeholder='Busca una película o serie' />
                            </form>
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