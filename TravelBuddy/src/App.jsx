import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/LoginPage/Login.jsx";
import Register from "./Components/LoginPage/Register.jsx";
import Home from "./Components/Home/Home.jsx";
import axios from "axios";
import { UserContextProvider } from "./Components/UserContext/UserContext.jsx";
import AccountPage from "./Components/AccountPage/AccountPage.jsx";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
