// Importaciones
import './App.css'
import { Login } from '@pages/Login/Login'
import { SignUp } from '@pages/SignUp/SignUp'
import { Kudi } from '@pages/Kudi/Kudi'
import { KudiContext } from '@context/Context'

import { useEffect, useState } from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  // States
  const [ login , setLogin] = useState()
  const [ movies , setMovies] = useState([])
  const [ movie , setMovie] = useState([])
  const [ tvshows , setTvshows] = useState([])
  const [ tvshow , setTvshow] = useState([])
  const [ users , setUsers] = useState([])
  const [ user , setUser] = useState([])
  const [ currentUser , setCurrentUser ] = useState(null)

  // Variables de entorno
  const { VITE_API} = import.meta.env

  // Fetch
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

  return (
    <KudiContext.Provider value={{ VITE_API , login , setLogin , movies , setMovies , getMovies , movie , setMovie , users , setUsers , getUsers , user , setUser , currentUser , setCurrentUser , tvshow , setTvshow , getTvshows , tvshows , setTvshows }}>          {/* // Contexto para compartir con el resto de la APP */}
    <BrowserRouter>                                                                 {/* // Creacion de rutas para navegar por diferentes paginas */}
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
