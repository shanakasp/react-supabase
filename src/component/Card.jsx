import React from "react";

const Card = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.methid}</p>
      <div className="rating">{smoothie.rating}</div>
    </div>
  );
};

export default Card;
