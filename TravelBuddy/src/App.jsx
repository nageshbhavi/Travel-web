
import './App.css'
import { Route, Routes} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.jsx';
import Login from './Components/LoginPage/Login.jsx';

function App() {


  return (
    <>

    <Routes>
      <Route path='/' element={<Navbar />}/>
      <Route path='/login' element={<Login/>}/>
      {/* <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> */}
    </Routes>
    </>

  )
}

export default App
