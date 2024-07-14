// Importaciones
import './ModifyProfileMenu.css'

import { KudiContext } from '@context/Context'

import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const ModifyProfileMenu = ()=>{

    // Contexto
    const { VITE_API , setLogin , user , setUser , getUser , users , getUsers , closeModify , modifyModal , setModifyModal , error, setError , userError , setUserError} = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()


    // Refs
    const form = useRef()

    
    const handleSubmit = (e) => {                                           // Funcion para controlar la creación del usuario sólo si las contraseñas coinciden.
        e.preventDefault()

        const {current: formData} = form

        if (formData['pass'].value === formData['pass-repeat'].value ) {   // Si las contraseñas coinciden entra en el condicional
            setError(true)                                                  // Si entra en el condicional, cambia el estado de error para que no aparezca
            sendUser()                                                      // Se hace el Fetch                                                             
        }
        else{                                                               
            return setError(false)                                          // Si no se cumple el condicional, setea el error en false para mostrarlo.
        }
    }

    const sendUser = async ()=>{  
        getUsers()      
        let username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
        const userLogged = users.find(eachUser => eachUser.username === username)           // Buscar el usuario logueado entre los usuarios de la bbdd   
    
        const {current: formData} = form
        const modifiedUser = {  
            id: userLogged._id,                                                 // Datos del usuario introducidos en el form
            username : formData['user'].value,
            password: formData['pass'].value
        }

        let controller = new AbortController()                                                  // Se usará para cerrar la conexión a Mongo.             
        let options = {
            method: 'put',                                                                      // Método POST para enviar los datos
            signal: controller.signal,                                                          // Asociar señal a controller
            headers: {"Content-type" : "application/json "},                                    // Tipo de dato enviado por el body         
            body: JSON.stringify(modifiedUser)                                                  // Enviar por el body los nuevos datos de usuario convertidos a JSON.
        }
        await fetch(`${VITE_API}/users` , options)                                              // Petición mediante fetch a la API para añadir el usuario en el endpoint sing up, donde el post se ejecuta diferente a login.
            .then(res => res.json())
            .then(data =>{
                if(data.error){                                                                 // Condicional para impedir usuarios duplicados. (Está configurado en la API, en el controller de postUser)
                    setUserError(data.error)                                                    // Setear a Error en el caso de que la petición devuelva el error de doble usuario y estilar el form
                } else {
                    setUserError('')                                                            // Reiniciar variable de error de usuario
                    setUser(data)                                                               // Setear a User con el nuevo usuario creado para añadirlo a la bbdd porque las contraseñas coinciden
                    localStorage.setItem('username' , JSON.stringify(modifiedUser.username))    // Guardar el nombre del usuario que se loguea para mostrarlo en la APP.
                    setModifyModal(false)                                                       // Cerrar el modal al hacer fetch
                    setError(true)                                                              // Limpiar el error del form
                    navigate('/')                                                              
                }
            })                           
            .catch(err => console.log(err.message))
            .finally(()=> controller.abort())                       // Desconexión de la API
            formData['user'].value = ''
            formData['pass'].value = ''
            formData['pass-repeat'].value = ''
            
    }

    return(
        <>
        <div className={`Modify-wrapper`}>
            <div className={`Modify-menu ${modifyModal ? `isOpen` : ``}`}>
                <h2 className="Profile-h2 H2">Modificar usuario</h2>
                <form ref={form} onSubmit={handleSubmit} className="Modify-form">
                    <label htmlFor="user" className="Signup-label">Nombre de usuario</label>
                    <input type="text" name='user' id='user' className={`Signup-input`} required />
                    <div className={`Signup-error ${userError && `isActive`}`}>
                        <svg className='Error-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99956 3C8.3324 3 8.63945 3.17579 8.80822 3.4641L13.8711 12.0897C14.0422 12.3804 14.0422 12.739 13.8758 13.0296C13.7093 13.3203 13.3976 13.5008 13.0624 13.5008H2.9367C2.60152 13.5008 2.28978 13.3203 2.12336 13.0296C1.95694 12.739 1.95929 12.378 2.12805 12.0897L7.19091 3.4641C7.35967 3.17579 7.66673 3 7.99956 3ZM7.99956 6.00021C7.68782 6.00021 7.43702 6.25101 7.43702 6.56275V9.18794C7.43702 9.49968 7.68782 9.75048 7.99956 9.75048C8.31131 9.75048 8.56211 9.49968 8.56211 9.18794V6.56275C8.56211 6.25101 8.31131 6.00021 7.99956 6.00021ZM8.74962 11.2506C8.74962 11.0517 8.67059 10.8609 8.52993 10.7202C8.38927 10.5796 8.19849 10.5005 7.99956 10.5005C7.80064 10.5005 7.60986 10.5796 7.4692 10.7202C7.32853 10.8609 7.24951 11.0517 7.24951 11.2506C7.24951 11.4495 7.32853 11.6403 7.4692 11.781C7.60986 11.9216 7.80064 12.0006 7.99956 12.0006C8.19849 12.0006 8.38927 11.9216 8.52993 11.781C8.67059 11.6403 8.74962 11.4495 8.74962 11.2506Z" fill="#E66868"/>
                        </svg>
                        <span className={`Signup-span--error ${error === false ? `isActive` : ``}`}>El usuario ya existe</span>
                    </div>
                    <label htmlFor="pass" className="Signup-label">Contraseña</label>
                    <input type="password" name='pass' id='pass' className={`Signup-input ${error === false ? `Signup-input--error` : ``}`} required />
                    <div className={`Signup-error ${error === false && `isActive`}`}>
                        <svg className='Error-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99956 3C8.3324 3 8.63945 3.17579 8.80822 3.4641L13.8711 12.0897C14.0422 12.3804 14.0422 12.739 13.8758 13.0296C13.7093 13.3203 13.3976 13.5008 13.0624 13.5008H2.9367C2.60152 13.5008 2.28978 13.3203 2.12336 13.0296C1.95694 12.739 1.95929 12.378 2.12805 12.0897L7.19091 3.4641C7.35967 3.17579 7.66673 3 7.99956 3ZM7.99956 6.00021C7.68782 6.00021 7.43702 6.25101 7.43702 6.56275V9.18794C7.43702 9.49968 7.68782 9.75048 7.99956 9.75048C8.31131 9.75048 8.56211 9.49968 8.56211 9.18794V6.56275C8.56211 6.25101 8.31131 6.00021 7.99956 6.00021ZM8.74962 11.2506C8.74962 11.0517 8.67059 10.8609 8.52993 10.7202C8.38927 10.5796 8.19849 10.5005 7.99956 10.5005C7.80064 10.5005 7.60986 10.5796 7.4692 10.7202C7.32853 10.8609 7.24951 11.0517 7.24951 11.2506C7.24951 11.4495 7.32853 11.6403 7.4692 11.781C7.60986 11.9216 7.80064 12.0006 7.99956 12.0006C8.19849 12.0006 8.38927 11.9216 8.52993 11.781C8.67059 11.6403 8.74962 11.4495 8.74962 11.2506Z" fill="#E66868"/>
                        </svg>
                        <span className={`Signup-span--error ${error === false && `isActive`}`}>Las contraseñas no coinciden</span>
                    </div>
                    <label htmlFor="pass-repeat" className="Signup-label">Repita la contraseña</label>
                    <input type="password" name='pass-repeat' id='pass-repeat' className={`Signup-input ${error === false ? `Signup-input--error`: ``}`} required />
                    <div className={`Signup-error ${error === false && `isActive`}`}>
                        <svg className='Error-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99956 3C8.3324 3 8.63945 3.17579 8.80822 3.4641L13.8711 12.0897C14.0422 12.3804 14.0422 12.739 13.8758 13.0296C13.7093 13.3203 13.3976 13.5008 13.0624 13.5008H2.9367C2.60152 13.5008 2.28978 13.3203 2.12336 13.0296C1.95694 12.739 1.95929 12.378 2.12805 12.0897L7.19091 3.4641C7.35967 3.17579 7.66673 3 7.99956 3ZM7.99956 6.00021C7.68782 6.00021 7.43702 6.25101 7.43702 6.56275V9.18794C7.43702 9.49968 7.68782 9.75048 7.99956 9.75048C8.31131 9.75048 8.56211 9.49968 8.56211 9.18794V6.56275C8.56211 6.25101 8.31131 6.00021 7.99956 6.00021ZM8.74962 11.2506C8.74962 11.0517 8.67059 10.8609 8.52993 10.7202C8.38927 10.5796 8.19849 10.5005 7.99956 10.5005C7.80064 10.5005 7.60986 10.5796 7.4692 10.7202C7.32853 10.8609 7.24951 11.0517 7.24951 11.2506C7.24951 11.4495 7.32853 11.6403 7.4692 11.781C7.60986 11.9216 7.80064 12.0006 7.99956 12.0006C8.19849 12.0006 8.38927 11.9216 8.52993 11.781C8.67059 11.6403 8.74962 11.4495 8.74962 11.2506Z" fill="#E66868"/>
                        </svg>
                        <span className={`Signup-span--error`}>Las contraseñas no coinciden</span>
                    </div>
                    <div className="BtnModify-wrapper">
                        <input type="submit" value="Modificar usuario" className="Modify-submit" />
                        <button onClick={closeModify} className="Delete-btn Delete-btn--cancel" title='Cancelar'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}