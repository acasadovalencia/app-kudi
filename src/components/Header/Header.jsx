import './Header.css'

import { useNavigate , NavLink, useLocation } from 'react-router-dom'


export const Header = ()=>{

    let user = JSON.parse(localStorage.getItem('username'))                         // Guardar el nombre de usuario del localStorage para poder mostrarlo

    const navigate = useNavigate()                                                  // Asociar el hook useNavigate a una constante para que se pueda usar en otros Hooks

    const currentPage = useLocation()                                               // Guardamos en que punto del Router está la página para estilos de CSS


    // Funcion para salir de la APP y eliminar el localStorage.
    const logout = ()=>{                                                             
        localStorage.removeItem('username')                                         // Eliminar el nombre de usuario de localStorage para borarr el nombre
        localStorage.removeItem('user')                                             // Eliminar el estado del login de localStorage para no redireccionar de nuevo
        navigate('/')                                                               // Vuelve a la página inicial para hacer el login
    }


    return(
        <>
        <header className="Header">
            <div className="Header-wrapper">
                <NavLink to='/'>
                    <h1 className="Logo-h1">KUDI</h1>
                </NavLink>
                <nav className="Header-nav">
                    <ul className="Header-ul Nav">
                        <li className={`Nav-li ${currentPage.pathname == '/kudi' ? `CurrentPage` : ``}`}>                       {/* Incluimos una clase o no, según el nombre del path de la route */}
                        <NavLink to='/kudi'>Inicio</NavLink>
                        </li>
                        <li className="Nav-li">
                        <NavLink to='/kudi'>Categorías</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname.includes('/kudi/movies') ? `CurrentPage` : ``}`}>
                            <NavLink to='/kudi/movies'>Películas</NavLink>
                        </li>
                        <li className="Nav-li">
                        <NavLink to='/kudi'>Series</NavLink>
                        </li>
                        <li className={`Nav-li ${currentPage.pathname == '/kudi/favlist' ? `CurrentPage` : ``}`}>
                        <NavLink to={`/kudi/favlist`}>Mi lista</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="Header-profile Profile">
                    <span className="Profile-span">{user}</span>
                    <img src="" alt="" className="Profile-img" />
                    <button onClick={logout} className='Profile-btn'>Cerrar sesión</button>
                </div>
            </div>
        </header>
        </>
    )
}