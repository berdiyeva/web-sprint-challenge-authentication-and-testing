import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../utils";
import Joke from "./Joke";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`${process.env.REACT_APP_API_URL}/jokes`)
      .then((res) => setJokes(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="jokes">
      {jokes.map((joke) => (
        <Joke key={joke.id} {...joke} />
      ))}
    </div>
  );
};

export default Jokes;