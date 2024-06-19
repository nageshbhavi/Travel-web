import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VisitedPlaceDetails.css";

const VisitedPlaceDetails = ({ place, onClose }) => {
  return (
    <>
    <div className="place-details">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>{place.name}</h2>
      <img src={place.imageLink} alt={place.name} />
      <p>Description: {place.description}</p>
      <p>Review: {place.review}</p>
    </div>


  </>
  );
};

export default VisitedPlaceDetails;
