// Importaciones
import './App.css'
import { Login } from '@pages/Login/Login'
import { SignUp } from '@pages/SignUp/SignUp'
import { Kudi } from '@pages/Kudi/Kudi'
import { KudiContext } from '@context/Context'

import { useState } from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  // Variables de entorno
  const { VITE_API} = import.meta.env

  // States
  const [ login , setLogin] = useState()
  const [ movie , setMovie] = useState([])
  const [ users , setUsers] = useState([])

  // Fetch
  const getUsers = async ()=>{
          let controller = new AbortController()
          let options = {
              method : 'get',                         // Método GET porque se piden datos
              signal: controller.signal
          }
          await fetch(`${VITE_API}/users` , options) // Fetch al endpoint /movie para obtener los datos
          .then(res => res.json())
          .then( data => setUsers(data))             // Setear datos de la respuesta a movies
          .catch( err => console.log(err.message))    // Capturar y mostrar error
          .finally(()=> controller.abort())           // Abortar conexión con API
          
  }
  

  return (
    <KudiContext.Provider value={{login , setLogin , movie , setMovie , users , setUsers , getUsers}}>          {/* // Contexto para compartir con el resto de la APP */}
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
