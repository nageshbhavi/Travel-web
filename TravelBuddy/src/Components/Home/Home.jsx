import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import video from '../../assets/video1.mp4';



const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="homepage">

      <video autoPlay loop muted src={video} type="video/mp4" ></video>
      {/* <h1>      this is home</h1>  */}
    </div>
    </>
  );
};

export default Home;


// import React from "react";
// import "./Home.css";
// import VideoCarousel from "./VideoCarousel";

// const Home = () => {
//   const videos = [
//     { src: "video1.mp4" },
//     { src: "video1.mp4" },
//     { src: "video1.mp4" },
//     { src: "video1.mp4" },
//     { src: "video1.mp4" },
//   ];

//   return (
//     <div className="homepage">
//       <h1>Welcome to Our Website</h1>
//       <p>Discover amazing destinations with our video carousel:</p>
//       <VideoCarousel videos={videos} />
//     </div>
//   );
// };

// export default Home;


