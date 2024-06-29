// Importaciones
import './App.css'
import { Login } from '@pages/Login/Login'
import { SignUp } from '@pages/SignUp/SignUp'
import { Kudi } from '@pages/Kudi/Kudi'
import { KudiContext } from '../context/Context'

import { useState } from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  // States
  const [ login , setLogin] = useState()  

  return (
    <KudiContext.Provider value={{login , setLogin }}>          // Contexto para compartir con el resto de la APP
    <BrowserRouter>                                             // Creacion de rutas para navegar por diferentes paginas
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/kudi' element={<Kudi/>}/>
    </Routes>
    </>
    </BrowserRouter>
    </KudiContext.Provider>
  )
}

export default App
