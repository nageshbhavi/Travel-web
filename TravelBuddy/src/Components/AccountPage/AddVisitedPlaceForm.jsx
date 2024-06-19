import React, { useState } from "react";
import axios from "axios";
import "./AddVisitedPlaceForm.css";

const AddVisitedPlaceForm = ({ onAddPlace }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [placeData, setPlaceData] = useState({
    name: "",
    description: "",
    imageLink: "",
    review: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/visited-places", placeData);
      const newPlace = response.data;
      onAddPlace(newPlace); // Update parent component with new place
      setPlaceData({
        name: "",
        description: "",
        imageLink: "",
        review: ""
      });
      setIsFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding visited place:", error);
    }
  };

  return (
    <div>
      {!isFormVisible && (
        <button className="add-place-button" onClick={() => setIsFormVisible(true)}>
          Add Place
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="add-place-form">
          <label>
            Name:
            <input type="text" name="name" value={placeData.name} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={placeData.description} onChange={handleChange} required />
          </label>
          <label>
            Image Link:
            <input type="text" name="imageLink" value={placeData.imageLink} onChange={handleChange} required />
          </label>
          <label>
            Review:
            <textarea name="review" value={placeData.review} onChange={handleChange} required />
          </label>
          <button type="submit">Add Place</button>
        </form>
      )}
    </div>
  );
};

export default AddVisitedPlaceForm;
