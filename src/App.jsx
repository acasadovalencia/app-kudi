// Importaciones
import './App.css'
import { Login } from '@pages/Login/Login'
import { SignUp } from '@pages/SignUp/SignUp'
import { Kudi } from '@pages/Kudi/Kudi'
import { KudiContext } from '@context/Context'

import { useEffect, useState } from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {
  // States
  const [ login , setLogin ] = useState()
  const [ movies , setMovies ] = useState([])
  const [ movie , setMovie ] = useState([])
  const [ tvshows , setTvshows ] = useState([])
  const [ tvshow , setTvshow ] = useState([])
  const [ users , setUsers]  = useState([])
  const [ user , setUser ] = useState([])
  const [ currentUser , setCurrentUser ] = useState(null)
  const [ categories , setCategories ] = useState([])
  const [ type , setType ] = useState('all')
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const [ deleteAlert , setDeleteAlert ] = useState(false)
  const [ modifyModal , setModifyModal ] = useState(false)
  const [ error , setError] = useState(true)
  const [userError , setUserError] = useState('') 



  // Variables de entorno
  const { VITE_API} = import.meta.env
  

  // Fetchs
  const getUsers = async ()=>{
          let controller = new AbortController()
          let options = {
              method : 'get',                         // Método GET porque se piden datos
              signal: controller.signal
          }
          await fetch(`${VITE_API}/users` , options) // Fetch al endpoint /user para obtener los datos
          .then(res => res.json())
          .then( data => setUsers(data))             // Setear datos de la respuesta a usuarios
          .catch( err => console.log(err.message))    // Capturar y mostrar error
          .finally(()=> controller.abort())           // Abortar conexión con API
          
  }

  const getMovies = async ()=>{
    let controller = new AbortController()
    let options = {
        method : 'get',                         // Método GET porque se piden datos
        signal: controller.signal
    }
    await fetch(`${VITE_API}/movies` , options) // Fetch al endpoint /movie para obtener los datos
    .then(res => res.json())
    .then( data => setMovies(data))             // Setear datos de la respuesta a movies
    .catch( err => console.log(err.message))    // Capturar y mostrar error
    .finally(()=> controller.abort())           // Abortar conexión con API

  }

  const getTvshows = async ()=>{
    let controller = new AbortController()
    let options = {
        method : 'get',                         // Método GET porque se piden datos
        signal: controller.signal
    }
    await fetch(`${VITE_API}/tvshows` , options) // Fetch al endpoint /movie para obtener los datos
    .then(res => res.json())
    .then( data => setTvshows(data))             // Setear datos de la respuesta a movies
    .catch( err => console.log(err.message))    // Capturar y mostrar error
    .finally(()=> controller.abort())           // Abortar conexión con API

  }

  const getUser = async (id)=>{
    let controller = new AbortController()
    let options = {
        method : 'get',                                                                       // Método GET porque se piden datos
        signal: controller.signal
    }
        await fetch(`${VITE_API}/user/id/${id}` , options)                                   // Fetch al endpoint /user/id/:id para obtener los datos de un usuario 
        .then(res => res.json())
        .then( data => setUser(data))                                                        // Guardar datos de la respuesta a user
        .catch( err => console.log(err.message))                                             // Capturar y mostrar error
        .finally(()=> controller.abort())                                                    // Abortar conexión con API
  }

  const getCategories = async ()=>{
    let controller = new AbortController()
    let options = {
        method : 'get',                         // Método GET porque se piden datos
        signal: controller.signal
    }
    await fetch(`${VITE_API}/categories` , options) // Fetch al endpoint /movie para obtener los datos
    .then(res => res.json())
    .then( data => setCategories(data))             // Setear datos de la respuesta a movies
    .catch( err => console.log(err.message))    // Capturar y mostrar error
    .finally(()=> controller.abort())           // Abortar conexión con API

  }

  // Funciones
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  
  const openAlert = () =>{
    setDeleteAlert(true)
    setIsMenuOpen(false)
  }

  const openModify = ()=>{
    setModifyModal(true)
    setUserError(false)
  }
  const closeModify = (e)=>{                    // Utilizo el evento porque al tener el botón en el formulario, ejecuta un evento y da error en los inputs vacios
    e.preventDefault()                          // Prevenir el evento para no da error al cancelar el form
    setModifyModal(false)
    setUserError(false)
  }

  return (
    <KudiContext.Provider value={{ VITE_API , login , setLogin , movies , setMovies , getMovies , movie , setMovie , users , setUsers , getUsers , user , setUser , getUser , currentUser , setCurrentUser , tvshow , setTvshow , getTvshows , tvshows , setTvshows , categories , setCategories , getCategories , type , setType , deleteAlert , setDeleteAlert , isMenuOpen, setIsMenuOpen , closeMenu , openAlert , modifyModal , setModifyModal , openModify , closeModify , error , setError , userError , setUserError}}>          {/* // Contexto para compartir con el resto de la APP */}
    <BrowserRouter>
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/kudi/*' element={<Kudi/>}/>
    </Routes>
    </>
    </BrowserRouter>
    </KudiContext.Provider>
  )
}

export default App
