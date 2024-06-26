//Importaciones
import './SignUp.css'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignUp = ()=>{

    // Variables al uso
    const navigate = useNavigate()                                   // Asociar a una variable al no poderse declarar dentro un Hook en otro Hook.

    // Variables de entorno
    const { VITE_API } = import.meta.env

    // States
    const [ user , setUser] = useState()                          
    
    // Refs
    const form = useRef()

    // Effects
    useEffect(()=>{
        if( user ){                                                // Condicional que si usuario es true, vaya a la ruta /kodi                       
            navigate('/')
        }
    }, [user])                                                     // El effect se ejecutará cada vez que usuario cambie
                                                     

    // Funciones
    const sendUser = async (e)=>{                                  // Funcion asíncrona ya que conectará a MongoDB
        e.preventDefault()

        const {current: formData} = form

        const newUser = {                                          // Datos del usuario introducidos en el form
            username : formData['user'].value,
            password: formData['pass'].value
        }

        let controller = new AbortController()                      // Se usará para cerrar la conexión a Mongo.             
        let options = {
            method: 'post',                                         // Método POST para enviar los datos
            signal: controller.signal,                              // Asociar señal a controller
            headers: {"Content-type" : "application/json "},        // Tipo de dato enviado por el body         
            body: JSON.stringify(newUser)                          // Enviar por el body los nuevos datos que se compararán convertidos a JSON.
        }
        await fetch(`${VITE_API}/signup` , options)                  // Petición mediante fetch a la API para el nuevo usuario
            .then(res => res.json())
            .then(data => setUser(data))                            // Setear a User con el nuevo usuario creado para añadirlo a la bbdd
            .catch(err => console.log(err.message))
            .finally(()=> controller.abort())                       // Desconexión de la API
    }

    return(
        <>
        <div className="Login">
            <div className="Form-wrapper">
                <h2 className="Form-h2 H2">Crear usuario</h2>
                <form ref={form} onSubmit={sendUser} className="Signup-form">
                    <label htmlFor="user" className="Signup-label">Nombre de usuario</label>
                    <input type="text" name='user' id='user' className={`Signup-input`} required />
                    <label htmlFor="pass" className="Signup-label">Contraseña</label>
                    <input type="password" name='pass' id='pass' className={`Signup-input`} required />
                    <input type="submit" value="Crear usuario" className="Signup-submit" />
                </form>
            </div>
            <picture className="Login-picture">
                <source srcSet='assets/login-bg-1360x768.webp' type='webp' width={1360} height={768} />
                <img src="assets/login-bg-1360x768.jpg" alt="Movies mosaic" className="Login-img" />
            </picture>
        </div>
        </>
    )
}