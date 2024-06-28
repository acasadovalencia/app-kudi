import { useNavigate } from 'react-router-dom'
import './Header.css'

export const Header = ()=>{

    let user = JSON.parse(localStorage.getItem('username'))                         // Guardar el nombre de usuario

    const navigate = useNavigate()

    const logout = ()=>{                                                            
        localStorage.removeItem('username')                                         // Eliminar el nombre de usuario de localStorage para borarr el nombre
        localStorage.removeItem('user')                                             // Eliminar el estado del login de localStorage para no redireccionar de nuevo
        navigate('/')
    }

    return(
        <>
        <header className="Header">
            <div className="Header-wrapper">
                <a href="" className="Header-a Logo">
                    <h1 className="Logo-h1">KUDI</h1>
                </a>
                <nav className="Header-nav">
                    <ul className="Header-ul Nav">
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Inicio</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Categorias</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Películas</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Series</a>
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