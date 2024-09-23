import React, { useEffect, useState, useCallback } from "react";
import { Table, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { fetchCart, updateCart } from "../utils/utils";

export const CheckoutPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState([]);
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  const removeFromCart = true;

  const checkout = async () => {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/members/checkout/",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username, movie_ids: user.cart }),
      }
    );
    console.log(`checkout response=${JSON.stringify(response)}`);
    if (response.ok) {
      navigate("/movies/");
    }
    // @TODO: failed checkout message
  };

  const cartRemove = (movie) => {
    console.log("## user", user);
    setCart(updateCart(user.username, movie.id, cart, removeFromCart));
    // user.cart.splice(user.cart.indexOf(movie.id), 1);
    setMovies(movies.filter((m) => m.id !== movie.id));
    // localStorage.setItem("user", JSON.stringify(user));
    const foo = async () => {
      user.cart.splice(user.cart.indexOf(movie.id), 1);
    };

    foo().then((response) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
  };

  useEffect(() => {
    console.log("username=", user.username, user);
    if (user.username) {
      fetchCart(user.username).then((movies) => {
        setMovies(movies);
        setCart(movies.map((movie) => movie.id));
        // @TODO: better way to handle cart syncing issue?
        const foo = async () => {
          user.cart = cart;
        };

        foo().then((response) => {
          localStorage.setItem("user", JSON.stringify(user));
        });
      });
    } else {
      setMovies([]);
      setCart([]);
    }
  }, []);

  console.log("$$ cart=", cart, user, user.username);

  return (
    <div style={{ backgroundColor: "darkblue" }}>
      <div style={{ backgroundColor: "gold", height: "150px" }}>
        <ul className="MemberBanner">
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}>
            <a href="/movies/">Back to Movies</a>
          </li>
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}>
            <a href="/member/">
              {user.first_name} {user.last_name}
            </a>
          </li>
          <li style={{ fontWeight: 1000, fontSize: "large" }}>
            {" "}
            Currently rented: {user.checked_out ? user.checked_out.length : 0}
          </li>
        </ul>
      </div>
      <Table striped>
        <Table.Body>
          {movies.map((movie) => {
            return (
              <Table.Row key={movie.id}>
                <Table.Cell style={{ fontWeight: 1000, fontSize: "large" }}>
                  {movie.title}
                </Table.Cell>
                <Table.Cell>
                  {movie.inventory ? (
                    <Button
                      onClick={() => {
                        cartRemove(movie);
                      }}
                    >
                      RemoveFromCart
                    </Button>
                  ) : (
                    <Button disabled={true}>Out of Stock</Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="container">
        <div className="center">
          <Button
            onClick={() => {
              checkout(user.username);
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
