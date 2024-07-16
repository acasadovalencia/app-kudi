// Importaciones
import './ProfileMenu.css'

import { KudiContext } from '@context/Context'

import { useContext , useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


export const ProfileMenu = ()=>{

    // Contexto
    const { isMenuOpen , closeMenu , openAlert , openModify , setUserError , setIsMenuOpen} = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()

    // Refs
    const profileContainer = useRef()                                           // Referenciar la etiqueta para detectarla
    const {current: profile} = profileContainer                                 // Se deconstruye
    
    // Effects
    useEffect(()=>{
        document.addEventListener('mousedown' , clickOutProfile)                // Agregar un listener que al hacer click, ejecute la funcion (cuando se haga click fuera de profile)
        document.addEventListener('touchstart' , clickOutProfile)                // Agregar un listener que al pulsar en movil, ejecute la funcion (cuando se haga click fuera de profile)

    }, [isMenuOpen])

    // Funciones
    const logout = ()=>{                                                        // Funcion para salir de la APP y eliminar el localStorage.                        
    localStorage.removeItem('username')                                         // Eliminar el nombre de usuario de localStorage para borarr el nombre
    localStorage.removeItem('user')                                             // Eliminar el estado del login de localStorage para no redireccionar de nuevo
    closeMenu()
    navigate('/')                                                               // Vuelve a la página inicial para hacer el login
    }

    const closeAndModify = ()=>{                                                // Funcion para cerrar el menu y abrir el siguiente
        closeMenu()
        openModify()
        setUserError(false)                                                     // Limpiar el error del form
    }

    const clickOutProfile = (e)=>{                                              // Funcion con evento
        if(profile && !profile.contains(e.target)){                             // Condicional para que si la etiqueta profile no contiene el target, ejecute el cierre de menú
            closeMenu()
        }
    }
    

    return(
        <>
        <div ref={profileContainer} className={`Profile-menu ${isMenuOpen ? `isOpen` : ``}` }>
            <h2 className='Profile-h2 H2'>Mi cuenta</h2>
            <ul className="Profile-ul">
            <li className="Profile-li">
                    <button onClick={closeAndModify} className='Profile-btn' title='Modificar usuario'>Modificar usuario</button>
                </li>
                <li className="Profile-li">
                    <button onClick={logout} className='Profile-btn' title='Cerrar sesión'>Cerrar sesión</button>
                </li>
                <li className="Profile-li">
                    <button onClick={openAlert} className='Profile-btn' title='Eliminar usuario'>Eliminar usuario</button>
                </li>
            </ul>
        </div>
        </>
    )
}