import React, { useState, useEffect } from 'react';
import './Destinations.css';
import placesData from './places.json';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer.jsx";

const Destinations = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [randomPlaces, setRandomPlaces] = useState([]);

  useEffect(() => {
    setPlaces(placesData);
    setRandomPlaces(getRandomPlaces(placesData, 12));
  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getRandomPlaces = (placesArray, count) => {
    let shuffled = placesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="destinations-container">
      <h1>Popular Destinations</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by place name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="places-list">
        {(searchTerm ? filteredPlaces : randomPlaces).map((place) => (
          <div key={place.id} className="place-card" onClick={() => handlePlaceClick(place)}>
            <img src={place.image} alt={place.name} />
            <h2>{place.name}</h2>
            <p>{place.description}</p>
          </div>
        ))}
        {(!searchTerm && randomPlaces.length === 0) && (
          <p>Loading...</p>
        )}
        {(searchTerm && filteredPlaces.length === 0) && (
          <p>No places found.</p>
        )}
      </div>
      {selectedPlace && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedPlace.image} alt={selectedPlace.name} className="modal-image"/>
            <h2>{selectedPlace.name}</h2>
            <p>{selectedPlace.description}</p>
            <div className="reviews">
              <h3>Top Reviews</h3>
              {selectedPlace.reviews.length > 0 ? (
                selectedPlace.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p><strong>{review.author}:</strong> {review.text}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Destinations;
