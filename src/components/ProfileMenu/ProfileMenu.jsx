// Importaciones
import './ProfileMenu.css'

import { KudiContext } from '@context/Context'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


export const ProfileMenu = ()=>{

    // Contexto
    const { isMenuOpen , closeMenu , openAlert , openModify , setUserError} = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()

    // Funciones
    const logout = ()=>{                                                          // Funcion para salir de la APP y eliminar el localStorage.                        
    localStorage.removeItem('username')                                         // Eliminar el nombre de usuario de localStorage para borarr el nombre
    localStorage.removeItem('user')                                             // Eliminar el estado del login de localStorage para no redireccionar de nuevo
    closeMenu()
    navigate('/')                                                               // Vuelve a la página inicial para hacer el login
    }

    const closeAndModify = ()=>{                                                // Funcion para cerrar el menu y abrir el siguiente
        closeMenu()
        openModify()
        setUserError(false)                                                              // Limpiar el error del form
    }

    return(
        <>
        <div className={`Profile-menu ${isMenuOpen && `isOpen`}` }>
            <h2 className='Profile-h2 H2'>Mi cuenta</h2>
            <ul className="Profile-ul">
            <li className="Profile-li">
                    <button onClick={closeAndModify} className='Profile-btn'>Modificar usuario</button>
                </li>
                <li className="Profile-li">
                    <button onClick={logout} className='Profile-btn'>Cerrar sesión</button>
                </li>
                <li className="Profile-li">
                    <button onClick={openAlert} className='Profile-btn'>Eliminar usuario</button>
                </li>
            </ul>
        </div>
        </>
    )
}