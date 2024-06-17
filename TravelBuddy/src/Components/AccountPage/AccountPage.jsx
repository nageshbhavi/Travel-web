import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AccountPage.css";
import axios from "axios";

const AccountPage = () => {
  let { subpage } = useParams();
  const { ready, user, setUser } = useContext(UserContext);

  const [userData, setUserData] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:9000/profile");
        const userDataFromServer = response.data;
        setUserData(userDataFromServer);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  if (!ready) {
    return (
      <>
        Loading... <br />if took too long, to load please refresh the page.
      </>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    try {
      await axios.post("/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function linkclasses(type = null) {
    let classes = "account-link";
    if (type === subpage) {
      return "active-link";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="accountpage">
        <Navbar />
        <div className="profileContainer">
          <div className="account-links">
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

          {subpage === "profile" && (
            <div
              className="profileInfo"
              style={{
                color: "black",
                textAlign: "left",
                marginTop: "5%",
                fontWeight: 600,
                marginLeft: "5%",
              }}
            >
              Welcome! <br />
              Name : {userData?.name || ""}
              <br />
              Email : {userData?.email || ""}
              <br />
              <button onClick={logout} className="logoutbtn">
                Logout
              </button>
            </div>
          )}

          {subpage==="visited" && (
            <div className="visitedcontainer">
                
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountPage;
