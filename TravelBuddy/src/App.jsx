import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/LoginPage/Login.jsx";
import Register from "./Components/LoginPage/Register.jsx";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
