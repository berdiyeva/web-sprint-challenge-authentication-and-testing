import React from "react";

const Joke = ({ joke }) => {
  return (
    <div className="jokes-item">
      <p>{joke}</p>
    </div>
  );
};

export default Joke;