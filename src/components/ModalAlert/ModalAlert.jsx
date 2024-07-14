// Importaciones
import './ModalAlert.css'

import { KudiContext } from '@context/Context'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const ModalAlert = ()=>{

    // Contexto
    const {VITE_API , deleteAlert , setDeleteAlert , users , setUsers , closeMenu} = useContext( KudiContext )

    // Variables al uso
    const navigate = useNavigate()
    let username = JSON.parse(localStorage.getItem('username'))                         // Obtener el usuario logueado
    const userLogged = users.find(eachUser => eachUser.username === username)           // Buscar el usuario logueado entre los usuarios de la bbdd    


    // Funciones
    const logout = ()=>{                                                          // Funcion para salir de la APP y eliminar el localStorage.                        
    localStorage.removeItem('username')                                         // Eliminar el nombre de usuario de localStorage para borarr el nombre
    localStorage.removeItem('user')                                             // Eliminar el estado del login de localStorage para no redireccionar de nuevo
    navigate('/')                                                               // Vuelve a la página inicial para hacer el login
    }
    
    const closeAlert = () =>{
        setDeleteAlert(false)
    }

    const deleteUser = async ()=>{

        let controller = new AbortController()                                              // Crear controller del fetch
        let options = {                                                                     // Crear options del fetch
            method: 'delete',                                                               // Usar metodo delete porque se elimina el usuario
            signal: controller.signal                                                       // Asignar signal al controller
        }
        await fetch(`${VITE_API}/user/id/${userLogged._id}` , options)                      // Fetch a la url utilizando el id de usuario 
        .then(res => res.json())                                                            // Transformar la respuesta
        .then(data => setUsers(data))                                                       // Asignar los datos a alumnos
        .catch(err => console.log(err.message))                                             // Capturar el error y enviarlo por cosola
        .finally( ()=> controller.abort() )                                                 // Abortar la conexión a la API
        closeAlert()
        closeMenu()
        logout()                                                                            // Salir de la aplicación
    }  

    return(
        <>
        <div className={`Delete-alert ${deleteAlert ? `isActive` : ``}`}>
            <div className="Delete-wrapper">
                <div className="Delete-text">
                    <h3 className='Delete-h3 H3'>¿Está seguro?</h3>
                    <span className="Delete-span">Perderá todas sus listas de favoritos</span>
                </div>
                <div className="BtnDelete-wrapper">
                    <button onClick={deleteUser} className="Delete-btn Delete-btn--delete" title='Eliminar usuario'>Eliminar usuario</button>
                    <button onClick={closeAlert} className="Delete-btn Delete-btn--cancel" title='Cancelar'>Cancelar</button>
                </div>
            </div>
        </div>
        </>
    )
}