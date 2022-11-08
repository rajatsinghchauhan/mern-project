import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";
import "./productDetails.css";

const reviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgb(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerHeight < 200 ? 20 : 25,
    value: Number(review.rating),
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.coment}</span>
    </div>
  );
};

export default reviewCard;
