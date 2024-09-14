import React, { useState, useEffect, useCallback } from "react";

import { MovieTable } from "../components/movie-table";
import { updateCart } from "../utils/utils";

export const MoviePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [member, setMember] = useState("");
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState(user && user.cart ? user.cart : []);

  const getMovies = async () => {
    const response = await fetch("http://127.0.0.1:8080/api/v1/movies");
    if (response.ok) {
      const newMovies = await response.json();
      setMovies(newMovies);
    }
  };

  movies.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    getMovies();
  }, []);

  const cartUpdate = (movies_id, removeFromCart) => {
    setCart(updateCart(user.username, movies_id, cart, removeFromCart));
  };

  return (
    <div>
      {/* @TODO: (1) move this into it's own component to reuse in other pages; (2) change text color of link to members page */}
      {/* @TODO: (2) seems to be re-rendering. Need to figure that out*/}
      <div
        style={{ backgroundColor: "darkblue", height: "150px", color: "gold" }}
      >
        <ul className="MemberBanner">
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "8px" }}>
            <h1 href="/movies/">Movies</h1>
          </li>
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "8px" }}>
            <a color="gold" href="/member/">
              {member.first_name} {member.last_name}
            </a>
          </li>
          {user ? (
            <li style={{ fontWeight: 1000, fontSize: "large" }}>
              {" "}
              Currently rented: {member.currently_rented}
            </li>
          ) : null}
        </ul>
      </div>
      <MovieTable movies={movies} cartUpdate={cartUpdate} cart={cart} />
    </div>
  );
};
