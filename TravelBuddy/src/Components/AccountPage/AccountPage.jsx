
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AccountPage.css";
import axios from "axios";
import AddVisitedPlaceForm from "./AddVisitedPlaceForm";
import VisitedPlaceDetails from "./VisitedPlaceDetails";


const AccountPage = () => {
  let { subpage } = useParams();
  const { ready, user, setUser } = useContext(UserContext);

  const [userData, setUserData] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [redirect, setRedirect] = useState(null);
  // const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:9000/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchVisitedPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/visited-places",
          { withCredentials: true }
        );
        setVisitedPlaces(response.data);
      } catch (error) {
        console.error("Error fetching visited places:", error);
      }
    };

    fetchProfile();
    fetchVisitedPlaces();
  }, []);

  useEffect(() => {
    async function fetchVisitedPlaces() {
      try {
        const response = await axios.get("http://localhost:9000/visited-places");
        console.log(response.data);  // Check the structure of response data
        setVisitedPlaces(response.data);  // Assuming setVisitedPlaces is a state updater
      } catch (error) {
        console.error("Error fetching visited places:", error);
      }
    }
  
    fetchVisitedPlaces();
  }, []);
  
  const handleAddPlace = (newPlace) => {
    setVisitedPlaces((prevPlaces) => [...prevPlaces, newPlace]);
  };

  const handleDeletePlace = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/visited-places/${id}`, {
        withCredentials: true,
      });
      setVisitedPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== id)
      );
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };


  if (!ready) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
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

  function linkClasses(type) {
    return type === subpage ? "active-link" : "account-link";
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Navbar />
      <div className="account-page">
        <div className="profile-container">
          <div className="account-links">
            <ul className="account-menu">
              <li>
                <Link to={"/account"} className={linkClasses("profile")}>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={"/account/visited"}
                  className={linkClasses("visited")}
                >
                  Visited
                </Link>
              </li>
              <li>
                <Link
                  to={"/account/upcoming"}
                  className={linkClasses("upcoming")}
                >
                  Upcoming
                </Link>
              </li>
            </ul>
            <div className="underline"></div>
          </div>

          <div className="content-container">
            {subpage === "profile" && (
              <>
                <h2>Welcome, {userData?.name}!</h2>
                <p>
                  <strong>Name:</strong> {userData?.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </>
            )}

{subpage === "visited" && (
          <div className="visited-container">
            <h2>Visited Places</h2>
            <AddVisitedPlaceForm onAddPlace={handleAddPlace} />
            <div className="visited-places">
  {visitedPlaces.map(place => (
    <div
      key={place.id}
      className="visited-place-card"
      onClick={() => setSelectedPlace(place)}
    >
      <h3>{place.name}</h3>
      {place.image_link && (
        <img src={place.image_link} alt={place.name} />
      )}
      <p>{place.description}</p>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event
          handleDeletePlace(place.id);
        }}
      >
        🗑️
      </button>
    </div>
  ))}
</div>

            {selectedPlace && (
              <VisitedPlaceDetails
                place={selectedPlace}
                onClose={() => setSelectedPlace(null)}
              />
            )}
          </div>
        )}
            {subpage === "upcoming" && (
              <div className="upcoming-container">
                <h2>Upcoming Trips</h2>
                {/* Add content for upcoming trips here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AddVisitedPlaceForm from "./AddVisitedPlaceForm";
// import axios from "axios";
// import "./AccountPage.css";

// const AccountPage = () => {
//   const [subpage, setSubpage] = useState("profile");
//   const [visitedPlaces, setVisitedPlaces] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     const fetchVisitedPlaces = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:9000/visited-places",
//           { withCredentials: true }
//         );
//         setVisitedPlaces(response.data);
//       } catch (error) {
//         console.error("Error fetching visited places:", error);
//       }
//     };

//     fetchProfile();
//     fetchVisitedPlaces();
//   }, []);

//   const handleAddPlace = (newPlace) => {
//     setVisitedPlaces((prevPlaces) => [...prevPlaces, newPlace]);
//   };

//   const handleDeletePlace = async (id) => {
//     try {
//       await axios.delete(`http://localhost:9000/visited-places/${id}`, {
//         withCredentials: true,
//       });
//       setVisitedPlaces((prevPlaces) =>
//         prevPlaces.filter((place) => place.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting place:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:9000/logout", {}, { withCredentials: true });
//       setUser(null);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div className="accountpage">
//       <div className="profileContainer">
//         <nav className="accountmenu">
//           <ul>
//             <li>
//               <Link
//                 to="/account"
//                 className={`account-link ${
//                   subpage === "profile" ? "active-link" : ""
//                 }`}
//                 onClick={() => setSubpage("profile")}
//               >
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/account/visited"
//                 className={`account-link ${
//                   subpage === "visited" ? "active-link" : ""
//                 }`}
//                 onClick={() => setSubpage("visited")}
//               >
//                 Visited Places
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <div className="underline"></div>

//         {subpage === "profile" && user && (
//           <div className="profile-container">
//             <h2>Welcome, {user.name}!</h2>
//             <button className="logoutbtn" onClick={handleLogout}>Logout</button>
//           </div>
//         )}

//         {subpage === "visited" && (
//           <div className="visited-container">
//             <h2>Visited Places</h2>
//             <AddVisitedPlaceForm onAddPlace={handleAddPlace} />
//             <div className="visited-places">
//               {visitedPlaces.map((place) => (
//                 <div key={place.id} className="visited-place">
//                   <button
//                     className="delete-button"
//                     onClick={() => handleDeletePlace(place.id)}
//                   >
//                     🗑️
//                   </button>
//                   <Link to={`/visited-places/${place.id}`}>
//                     <h3>{place.name}</h3>
//                     <img src={place.image_link} alt={place.name} />
//                     <p>{place.description}</p>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountPage;
