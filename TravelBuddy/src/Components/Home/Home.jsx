import React, { useContext, useEffect, useState, useRef} from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import video1 from "../../assets/mountain.mp4";
import video2 from "../../assets/girl.mp4";
import video3 from "../../assets/beach2.mp4";

const Home = () => {
  const videos = [video1, video2, video3];

  const videoRef = useRef(null);
  const currentVideoIndex = useRef(0);

  useEffect(() => {
    const videoElement = videoRef.current;

    const playNextVideo = () => {
      if (currentVideoIndex.current < videos.length - 1) {
        currentVideoIndex.current++;
        videoElement.src = videos[currentVideoIndex.current];
        videoElement.play();
      } else {
        // Restart from the first video
        currentVideoIndex.current = 0;
        videoElement.src = videos[currentVideoIndex.current];
        videoElement.play();
      }
    };

    videoElement.addEventListener("ended", playNextVideo);

    return () => {
      videoElement.removeEventListener("ended", playNextVideo);
    };
  }, [videos]);

  useEffect(() => {
    // Start playing the first video when the component mounts
    videoRef.current.src = videos[currentVideoIndex.current];
    videoRef.current.play();
  }, [videos]);

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        ></div>
        {/* <video loop autoPlay  muted  type="video/mp4" >
        <source src={video1}/>
        <source src={video3}/>
      </video> */}
        {/* {videos.map((video, index) => (
        <video key={index} autoPlay loop muted >
          <source src={video} type="video/mp4" />
        </video>
      ))} */}
        <video ref={videoRef} autoPlay muted>
          <source src={videos[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <h1>      this is home</h1>  */}
        <div
          className="homecontainer"
          style={{ position: "fixed", color: "white" }}
        >
          <h1>HOME PAGE</h1>
        </div>
        <div className="slidebars" style={{display:"flex", position:"fixed", marginTop:"500px"}}>
          <div className="slidebar" style={{backgroundColor:"white", height:"3px", width:"35px"}}></div>
          <div className="slidebar" style={{backgroundColor:"white", height:"3px", width:"35px", margin:"0 5px"}}></div>
          <div className="slidebar" style={{backgroundColor:"white", height:"3px", width:"35px"}}></div>
        </div>
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
