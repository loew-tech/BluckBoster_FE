import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export const MovieTable = ({ movies, updateCart, cart }) => {
  const navigate = useNavigate();
  const checkoutPath = "/checkout/";
  const changeRoute = () => {
    navigate(checkoutPath);
  };

  return (
    <div className="MovieTable">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Cast</Table.HeaderCell>
            <Table.HeaderCell>Available</Table.HeaderCell>
            <Table.HeaderCell>Rented</Table.HeaderCell>
            <Table.HeaderCell>
              <button disabled={!cart.length} onClick={changeRoute}>
                Cart ({cart.length})
              </button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {movies.map((movie, index) => {
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
                <Table.Cell>{movie.Inventory}</Table.Cell>
                <Table.Cell>{movie.Rented}</Table.Cell>
                <Table.Cell>
                  {movie.Inventory !== 0 && (
                    <Button
                      onClick={() => {
                        updateCart(
                          movie.movie_id,
                          cart.includes(movie.movie_id)
                        );
                      }}
                    >
                      {cart.includes(movie.movie_id)
                        ? "Remove from cart"
                        : "Add to cart"}
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
