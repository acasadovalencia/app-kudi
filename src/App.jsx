// Importaciones
import './App.css'
import { Login } from './pages/Login/Login'
import { Kudi } from './pages/Kudi/Kudi'

import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/kudi' element={<Kudi/>}/>
    </Routes>

    </>
    </BrowserRouter>
  )
}

export default App
