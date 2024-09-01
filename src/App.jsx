import './App.css'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  

  return (

<Router>

<div className='container_autenticacao'>

    <Routes>
        <Route path='/' element={<Login></Login>} />
        <Route path='/cadastro' element={<Cadastro></Cadastro>} />
    </Routes>

</div>

</Router>
  
  )
}

export default App
