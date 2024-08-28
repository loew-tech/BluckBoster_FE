import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { MovieTableHeader } from "./movie-table-header";

export const MovieTable = ({ movies, updateCart, cart }) => {
  // const navigate = useNavigate();
  // const checkoutPath = "/checkout/";
  // const changeRoute = () => {
  //   navigate(checkoutPath);
  // };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="MovieTable">
      <Table striped>
        <MovieTableHeader user={user} cart={cart} />

        <Table.Body>
          {movies.map((movie) => {
            return (
              <Table.Row key={`${movie.Id}`}>
                <Table.Cell style={{ fontWeight: 1000, fontSize: "large" }}>
                  {movie.Title}
                </Table.Cell>
                <Table.Cell>{movie.Rating}</Table.Cell>
                <Table.Cell>{movie.Year}</Table.Cell>
                <Table.Cell>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Director:</p>
                    {movie.Director}
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Starring:</p>
                    {movie.Cast.join(", ")}
                  </div>
                </Table.Cell>
                {user ? (
                  <>
                    <Table.Cell>{movie.Inventory}</Table.Cell>
                    <Table.Cell>{movie.Rented ? movie.Rented : 0}</Table.Cell>
                    <Table.Cell>
                      {movie.Inventory && (
                        <Button
                          onClick={() => {
                            // updateCart(
                            //   movie.movie_id,
                            //   cart.includes(movie.movie_id)
                            // );
                          }}
                        >
                          {cart.includes(movie.movie_id)
                            ? "Remove from cart"
                            : "Add to cart"}
                        </Button>
                      )}
                    </Table.Cell>
                  </>
                ) : null}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
