import React, { useState, useEffect } from 'react';
import './Destinations.css';
import placesData from './places.json';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer.jsx";

const Destinations = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPlaces(shuffleArray(placesData));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="destinations-container">
        <h1 className="title">Popular Destinations</h1>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by place name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="search-icon">&#128269;</span> {/* Unicode for search icon */}
          </div>
        </div>
        <div className="places-list">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="place-card" onClick={() => handlePlaceClick(place)}>
              <img src={place.image} alt={place.name} />
              <h2>{place.name}</h2>
              <p>{place.description}</p>
            </div>
          ))}
          {filteredPlaces.length === 0 && (
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
      <Footer />
    </>
  );
};

export default Destinations;
