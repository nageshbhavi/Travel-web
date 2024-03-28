import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import "./AccountPage.css";

const AccountPage = () => {
  const { ready, user } = useContext(UserContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage when component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
    <div className="accountpage">
    <Navbar />
    <div>
    {/* <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.2)",
          }}
        ></div> */}
      AccountPage for user: {userData ? userData.USER_NAME : ""}
      {/* <nav>
      <Link to={'/account'}>MY Profile</Link>
        <Link to={'/account/bookings'}>MY Bookings</Link>
        <Link to={'/account/places'}>MY Places</Link>
      </nav> */}
    </div>
    </div>
    </>
  );
};

export default AccountPage;
