
// import React, { useEffect, useRef } from "react";
// import "./Home.css";
// import Navbar from "../Navbar/Navbar";
// import video1 from "../../assets/video2.mp4";
// import video2 from "../../assets/girl.mp4";
// import video3 from "../../assets/video7.mp4";
// import video4 from "../../assets/video6.mp4";

// const Home = () => {
//   const videos = [video1, video2, video3, video4];

//   const videoRef = useRef(null);
//   const currentVideoIndex = useRef(0);

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     const playNextVideo = () => {
//       if (currentVideoIndex.current < videos.length - 1) {
//         currentVideoIndex.current++;
//         videoElement.src = videos[currentVideoIndex.current];
//         videoElement.play();
//       } else {
//         // Restart from the first video
//         currentVideoIndex.current = 0;
//         videoElement.src = videos[currentVideoIndex.current];
//         videoElement.play();
//       }
//     };

//     videoElement.addEventListener("ended", playNextVideo);

//     return () => {
//       videoElement.removeEventListener("ended", playNextVideo);
//     };
//   }, [videos]);

//   useEffect(() => {
//     // Start playing the first video when the component mounts
//     videoRef.current.src = videos[currentVideoIndex.current];
//     videoRef.current.play();
//   }, [videos]);

//   return (
//     <>
//       <Navbar />
//       <div className="homepage">
//         <div className="overlay"></div>
//         <video ref={videoRef} autoPlay muted className="background-video">
//           <source src={videos[0]} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         <div className="homecontainer">
//           <h1>Welcome to Your Travel Diary</h1>
//           <p>
//             Explore and share your travel experiences with a community of fellow adventurers.
//             Discover new places, get tips from others, and make the most of your journeys.
//           </p>
//           <button className="cta-button">Get Started</button>
//         </div>

//         <div className="slidebars">
//           <div className="slidebar"></div>
//           <div className="slidebar"></div>
//           <div className="slidebar"></div>
//         </div>
//       </div>

//       <div className="content popular-destinations">
//         <h2>Popular Destinations</h2>
//         <div className="destinations">
//           <div className="destination">
//             <img src="https://via.placeholder.com/300" alt="Destination" />
//             <h3>Destination Name</h3>
//           </div>
//           <div className="destination">
//             <img src="https://via.placeholder.com/300" alt="Destination" />
//             <h3>Destination Name</h3>
//           </div>
//           <div className="destination">
//             <img src="https://via.placeholder.com/300" alt="Destination" />
//             <h3>Destination Name</h3>
//           </div>
//         </div>
//       </div>

//       <div className="content latest-reviews">
//         <h2>Latest Reviews</h2>
//         <div className="reviews">
//           <div className="review">
//             <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida bibendum."</p>
//             <h4>- Reviewer Name</h4>
//           </div>
//           <div className="review">
//             <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida bibendum."</p>
//             <h4>- Reviewer Name</h4>
//           </div>
//           <div className="review">
//             <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida bibendum."</p>
//             <h4>- Reviewer Name</h4>
//           </div>
//         </div>
//       </div>

//       <div className="content user-testimonials">
//         <h2>User Testimonials</h2>
//         <div className="testimonials">
//           <div className="testimonial">
//             <p>"This website is fantastic! I've discovered so many amazing places through the reviews and photos."</p>
//             <h4>- User Name</h4>
//           </div>
//           <div className="testimonial">
//             <p>"A great community of travelers sharing their experiences. It's helped me plan my trips better."</p>
//             <h4>- User Name</h4>
//           </div>
//           <div className="testimonial">
//             <p>"The user reviews are very detailed and helpful. I love the photo-sharing feature."</p>
//             <h4>- User Name</h4>
//           </div>
//         </div>
//       </div>

//       <div className="content join-community">
//         <h2>Join Our Community</h2>
//         <p>
//           Sign up now to start sharing your travel experiences and discover new destinations through the eyes of fellow travelers.
//         </p>
//         <button className="cta-button">Sign Up</button>
//       </div>

//       <footer>
//         <p>© 2024 Travel Diary. All Rights Reserved.</p>
//         <div className="footer-links">
//           <a href="#!">Privacy Policy</a>
//           <a href="#!">Terms of Service</a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import placesData from "../Destinations/places.json";
import video1 from "../../assets/video2.mp4";
import video2 from "../../assets/girl.mp4";
import video3 from "../../assets/video7.mp4";
import video4 from "../../assets/video6.mp4";


const Home = () => {
  const videos = [video1, video2, video3, video4];

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

  // Function to randomly select 3 destinations
  const getRandomDestinations = () => {
    const shuffledPlaces = placesData.sort(() => 0.5 - Math.random());
    return shuffledPlaces.slice(0, 3);
  };

  const popularDestinations = getRandomDestinations();

  // Dummy reviews and testimonials
  const reviews = [
    { id: 1, text: "Great place to visit! Amazing views.", author: "John Doe" },
    { id: 2, text: "The food was delicious and the people were friendly.", author: "Jane Smith" },
    { id: 3, text: "An unforgettable experience. Will definitely come back!", author: "Michael Johnson" },
  ];

  const testimonials = [
    { id: 1, text: "I love this website! It's helped me plan my trips and find hidden gems.", user: "Emily Brown" },
    { id: 2, text: "The reviews are so helpful. I feel more confident traveling to new places now.", user: "David Wilson" },
    { id: 3, text: "A great community of travelers sharing their experiences. Highly recommend!", user: "Sarah Lee" },
  ];

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="overlay"></div>
        <video ref={videoRef} autoPlay muted className="background-video">
          <source src={videos[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="homecontainer">
          <h1>Welcome to Your Travel Diary</h1>
          <p>
            Explore and share your travel experiences with a community of fellow adventurers.
            Discover new places, get tips from others, and make the most of your journeys.
          </p>
          <button className="cta-button">Get Started</button>
        </div>

        <div className="slidebars">
          <div className="slidebar"></div>
          <div className="slidebar"></div>
          <div className="slidebar"></div>
        </div>
      </div>

      <div className="content popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="destination">
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="content latest-reviews">
        <h2>Latest Reviews</h2>
        <div className="reviews">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="review">
              <p>{reviews[Math.floor(Math.random() * reviews.length)].text}</p>
              <h4>- {reviews[Math.floor(Math.random() * reviews.length)].author}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="content user-testimonials">
        <h2>User Testimonials</h2>
        <div className="testimonials">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <p>{testimonial.text}</p>
              <h4>- {testimonial.user}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="content join-community">
        <h2>Join Our Community</h2>
        <p>
          Sign up now to start sharing your travel experiences and discover new destinations through the eyes of fellow travelers.
        </p>
        <button className="cta-button">Sign Up</button>
      </div>

      <footer>
        <p>© 2024 Travel Diary. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
        </div>
      </footer>
    </>
  );
};

export default Home;
