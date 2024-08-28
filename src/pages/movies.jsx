import React, { useState, useEffect, useCallback } from "react";
import { MovieTable } from "../components/movie-table";

import { getUser } from "../utils/utils";

export const MoviePage = () => {
  const [member, setMember] = useState("");
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = useCallback(async () => {
    // const response = await fetch(`http://127.0.0.1:5000/api/cart/${user}`);
    // if (response.ok) {
    //   const existingCart = await response.json();
    //   setCart(existingCart);
    // }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [fetchCart]);

  const updateCart = (id, removeFromCart) => {
    // console.log(`movie_id=${id}`);
    // let newCart = [...cart];
    // if (!removeFromCart) {
    //   newCart.unshift(id);
    //   fetch("http://127.0.0.1:5000/api/cart/add/", {
    //     method: "post",
    //     body: JSON.stringify({ member_id: user, movie_id: id }),
    //   });
    // } else {
    //   fetch("http://127.0.0.1:5000/api/cart/remove/", {
    //     method: "post",
    //     body: JSON.stringify({ member_id: user, movie_id: id }),
    //   });
    //   const index = newCart.indexOf(id);
    //   newCart.splice(index, 1);
    // }
    // setCart(newCart);
  };
  const getMovies = async () => {
    const response = await fetch("http://127.0.0.1:8080/api/v1/movies");
    if (response.ok) {
      const newMovies = await response.json();
      setMovies(newMovies);
    }
  };

  // useEffect(() => {
  //   getUser().then((member) => {
  //     setMember(member);
  //   });
  // }, []);

  movies.sort((a, b) => {
    if (a.Title < b.Title) {
      return -1;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    getMovies();
  }, []);

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
          <li style={{ fontWeight: 1000, fontSize: "large" }}>
            {" "}
            Currently rented: {member.currently_rented}
          </li>
        </ul>
      </div>
      {/* <MovieTable movies={movies} updateCart={updateCart} cart={cart} /> */}
      <MovieTable
        movies={movies}
        updateCart={() => {
          console.log("update cart called");
        }}
        cart={cart}
      />
    </div>
  );
};
