import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const { subpage } = useParams();
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

  function linkclasses(type = null) {
    let classes = "account-link";
    if (type === subpage || subpage===undefined && type==='profile') {
      return "active-link";
    }
    return classes;
  }

  return (
    <>
      <div className="accountpage">
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.2)",
          }}
        ></div>
        <Navbar />
        <div className="profileContainer">
          {/* AccountPage for user: {userData ? userData.USER_NAME : ""} */}
          <div className="account-links">
            {/* <nav>            </nav> */}
            {/* <div className="accountmenu"></div> */}
            <ul className="accountmenu">
              <li>
                <Link to={"/account"} className={linkclasses("profile")}>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={"/account/visited"}
                  className={linkclasses("visited")}
                >
                  Visited
                </Link>
              </li>
              <li>
                <Link
                  to={"/account/upcoming"}
                  className={linkclasses("upcoming")}
                >
                  Upcoming
                </Link>
              </li>
            </ul>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
