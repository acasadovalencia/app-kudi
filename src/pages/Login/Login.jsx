//Importaciones
import './Login.css'

import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KudiContext } from '../../../context/Context'

export const Login = ()=>{

    // Importacion de contexto
    const {login , setLogin} = useContext(KudiContext)

    // Variables al uso
    const navigate = useNavigate()                                              // Asociar a una variable al no poderse declarar dentro un Hook en otro Hook.

    // Variables de entorno
    const { VITE_API } = import.meta.env     
    
    // Refs
    const form = useRef()

    // Effects
    useEffect(()=>{
        let loginLocal = JSON.parse(localStorage.getItem('user'))
        if( loginLocal ){                                                       // Condicional que si login es true, vaya a la ruta /kodi                       
            navigate('/kudi')
        }
    }, [login])                                                                 // El effect se ejecutará cada vez que login cambie

    // Funciones
    const sendLogin = async (e)=>{                                              // Funcion asíncrona ya que conectará a MongoDB
        e.preventDefault()

        const {current: formData} = form

        const newLogin = {                                                      // Datos del login introducidos en el form
            username : formData['user'].value,
            password: formData['pass'].value
        }

        let controller = new AbortController()                                  // Se usará para cerrar la conexión a Mongo.             
        let options = {
            method: 'post',                                                     // Método POST para enviar los datos
            signal: controller.signal,                                          // Asociar señal a controller
            headers: {"Content-type" : "application/json "},                    // Tipo de dato enviado por el body         
            body: JSON.stringify(newLogin)                                      // Enviar por el body los nuevos datos que se compararán convertidos a JSON.
        }
        await fetch(`${VITE_API}/login` , options)                              // Petición mediante fetch a la API para el login
            .then(res => res.json())
            .then(data => {
                if(data.login){                                                 // Condicional para además de setear el resultado en Login, guardarlo en localStorage
                    setLogin(data.login)                                        // Setear a Login con el resultado del login (data.login) y no con el objeto (data)
                    localStorage.setItem('user' , JSON.stringify({login:true})) // Guardamos un objeto con valor true indicando que el login fué correcto.
                }
                else{
                    setLogin(false)
                }
            })                     
            .catch(err => console.log(err.message))
            .finally(()=> controller.abort())                                   // Desconexión de la API
    }

    return(
        <>
        <div className="Login">
            <div className="Form-wrapper">
                <h2 className="Form-h2 H2">Iniciar sesión</h2>
                <form ref={form} onSubmit={sendLogin} className="Login-form">
                    <label htmlFor="user" className="Login-label">Nombre de usuario</label>
                    <input type="text" name='user' id='user' className={`Login-input ${login === false ? `Login-input--error` : ``}`} required />
                    <div className="Error">
                        <svg className='Error-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99956 3C8.3324 3 8.63945 3.17579 8.80822 3.4641L13.8711 12.0897C14.0422 12.3804 14.0422 12.739 13.8758 13.0296C13.7093 13.3203 13.3976 13.5008 13.0624 13.5008H2.9367C2.60152 13.5008 2.28978 13.3203 2.12336 13.0296C1.95694 12.739 1.95929 12.378 2.12805 12.0897L7.19091 3.4641C7.35967 3.17579 7.66673 3 7.99956 3ZM7.99956 6.00021C7.68782 6.00021 7.43702 6.25101 7.43702 6.56275V9.18794C7.43702 9.49968 7.68782 9.75048 7.99956 9.75048C8.31131 9.75048 8.56211 9.49968 8.56211 9.18794V6.56275C8.56211 6.25101 8.31131 6.00021 7.99956 6.00021ZM8.74962 11.2506C8.74962 11.0517 8.67059 10.8609 8.52993 10.7202C8.38927 10.5796 8.19849 10.5005 7.99956 10.5005C7.80064 10.5005 7.60986 10.5796 7.4692 10.7202C7.32853 10.8609 7.24951 11.0517 7.24951 11.2506C7.24951 11.4495 7.32853 11.6403 7.4692 11.781C7.60986 11.9216 7.80064 12.0006 7.99956 12.0006C8.19849 12.0006 8.38927 11.9216 8.52993 11.781C8.67059 11.6403 8.74962 11.4495 8.74962 11.2506Z" fill="#E66868"/>
                        </svg>
                        <span className='Login-span--error'>Usuario/contraseña incorrectos</span>
                    </div>
                    <label htmlFor="pass" className="Login-label">Contraseña</label>
                    <input type="password" name='pass' id='pass' className={`Login-input ${login === false ? `Login-input--error` : ``}`} required />
                    <div className="Error">
                        <svg className='Error-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99956 3C8.3324 3 8.63945 3.17579 8.80822 3.4641L13.8711 12.0897C14.0422 12.3804 14.0422 12.739 13.8758 13.0296C13.7093 13.3203 13.3976 13.5008 13.0624 13.5008H2.9367C2.60152 13.5008 2.28978 13.3203 2.12336 13.0296C1.95694 12.739 1.95929 12.378 2.12805 12.0897L7.19091 3.4641C7.35967 3.17579 7.66673 3 7.99956 3ZM7.99956 6.00021C7.68782 6.00021 7.43702 6.25101 7.43702 6.56275V9.18794C7.43702 9.49968 7.68782 9.75048 7.99956 9.75048C8.31131 9.75048 8.56211 9.49968 8.56211 9.18794V6.56275C8.56211 6.25101 8.31131 6.00021 7.99956 6.00021ZM8.74962 11.2506C8.74962 11.0517 8.67059 10.8609 8.52993 10.7202C8.38927 10.5796 8.19849 10.5005 7.99956 10.5005C7.80064 10.5005 7.60986 10.5796 7.4692 10.7202C7.32853 10.8609 7.24951 11.0517 7.24951 11.2506C7.24951 11.4495 7.32853 11.6403 7.4692 11.781C7.60986 11.9216 7.80064 12.0006 7.99956 12.0006C8.19849 12.0006 8.38927 11.9216 8.52993 11.781C8.67059 11.6403 8.74962 11.4495 8.74962 11.2506Z" fill="#E66868"/>
                        </svg>
                        <span className='Login-span--error'>Usuario/contraseña incorrectos</span>
                    </div>
                    <input type="submit" value="Iniciar sesión" className="Login-submit" />
                </form>
                <span className="Login-span">¿No tienes cuenta?</span>
                <button onClick={()=>navigate('/signup')} className="Login-btn">Crear usuario</button>
            </div>
            <picture className="Login-picture">
                <source srcSet='assets/login-bg-1360x768.webp' type='webp' width={1360} height={768} />
                <img src="assets/login-bg-1360x768.jpg" alt="Movies mosaic" className="Login-img" />
            </picture>
        </div>
        </>
    )
}