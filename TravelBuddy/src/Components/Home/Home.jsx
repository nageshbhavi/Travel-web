import React, { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import placesData from "../Destinations/places.json";
import reviewsData from "./reviews.json";
import testimonialsData from "./testimonials.json";
import { UserContext } from "../UserContext/UserContext";
import video1 from "../../assets/video2.mp4";
import video2 from "../../assets/girl.mp4";
import video3 from "../../assets/video7.mp4";
import video4 from "../../assets/video6.mp4";
import discoverImage from "../../assets/travel_png.jpg";

const Home = () => {
  const videos = [video1, video2, video3, video4];
  const videoRef = useRef(null);
  const currentVideoIndex = useRef(0);
  const { user } = useContext(UserContext);

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

  // Function to randomly select 3 items from an array
  const getRandomItems = (items) => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, 3);
  };

  const popularDestinations = getRandomItems(placesData);
  const latestReviews = getRandomItems(reviewsData);
  const userTestimonials = getRandomItems(testimonialsData);

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
          <h1>Your Journey Your Story</h1>
          <p>
            Explore and share your travel experiences with a community of fellow adventurers.
            Discover new places, get tips from others, and make the most of your journeys.
          </p>
          {!user && (
            <Link to="/login" className="cta-button">Get Started</Link>
          )}
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
          {latestReviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.text}</p>
              <h4>- {review.author}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="content user-testimonials">
        <h2>User Testimonials</h2>
        <div className="testimonials">
          {userTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <p>{testimonial.text}</p>
              <h4>- {testimonial.user}</h4>
            </div>
          ))}
        </div>
      </div>

      {!user && (
        <div className="content join-community">
          <h2>Join Our Community</h2>
          <p>
            Sign up now to start sharing your travel experiences and discover new destinations through the eyes of fellow travelers.
          </p>
          <Link to="/login" className="cta-button">Sign Up</Link>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
