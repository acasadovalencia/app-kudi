//Importaciones
import './Login.css'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = ()=>{

    // Variables al uso
    const navigate = useNavigate()                                   // Asociar a una variable al no poderse declarar dentro un Hook en otro Hook.

    // Variables de entorno
    const { VITE_API } = import.meta.env

    // States
    const [ login , setLogin] = useState()                          
    
    // Refs
    const form = useRef()

    // Effects
    useEffect(()=>{

        if( login ){                                                // Condicional que si login es true, vaya a la ruta /kodi                       
            navigate('/kudi')
        }
    }, [login])                                                     // El effect se ejecutará cada vez que login cambie

    // Funciones
    const sendLogin = async (e)=>{                                  // Funcion asíncrona ya que conectará a MongoDB
        e.preventDefault()

        const {current: formData} = form

        const newLogin = {                                          // Datos del login introducidos en el form
            username : formData['user'].value,
            password: formData['pass'].value
        }

        let controller = new AbortController()                      // Se usará para cerrar la conexión a Mongo.             
        let options = {
            method: 'post',                                         // Método POST para enviar los datos
            signal: controller.signal,                              // Asociar señal a controller
            headers: {"Content-type" : "application/json "},        // Tipo de dato enviado por el body         
            body: JSON.stringify(newLogin)                          // Enviar por el body los nuevos datos que se compararán convertidos a JSON.
        }
        await fetch(`${VITE_API}/login` , options)                  // Petición mediante fetch a la API para el login
            .then(res => res.json())
            .then(data => setLogin(data.login))                     // Setear a Login con el resultado del login (data.login) y no con el objeto (data)
            .catch(err => console.log(err.message))
            .finally(()=> controller.abort())                       // Desconexión de la API
    }

    return(
        <>
        <div className="Login">
            <div className="Form-wrapper">
                <h2 className="Form-h2 H2">Iniciar sesión</h2>
                <form ref={form} onSubmit={sendLogin} className="Login-form">
                    <label htmlFor="user" className="Login-label">Usuario</label>
                    <input type="text" name='user' id='user' className="Login-input" required />
                    <label htmlFor="pass" className="Login-label">Contraseña</label>
                    <input type="password" name='pass' id='pass' className="Login-input" required />
                    <input type="submit" value="Iniciar sesión" className="Login-submit" />
                </form>
                <span className="Login-span">¿No tienes cuenta?</span>
                <button className="Login-btn">Crear usuario</button>
            </div>
            <picture className="Login-picture">
                <source srcSet='assets/login-bg-1360x768.webp' type='webp' width={1360} height={768} />
                <img src="assets/login-bg-1360x768.jpg" alt="Movies mosaic" className="Login-img" />
            </picture>
        </div>
        </>
    )
}