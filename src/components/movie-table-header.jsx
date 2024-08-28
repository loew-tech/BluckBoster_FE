import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

export const MovieTableHeader = ({ user, cart }) => {
  const navigate = useNavigate();
  const checkoutPath = "/checkout/";
  const changeRoute = () => {
    navigate(checkoutPath);
  };
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Year</Table.HeaderCell>
        <Table.HeaderCell>Cast</Table.HeaderCell>

        {user ? (
          <>
            <Table.HeaderCell>Available</Table.HeaderCell>
            <Table.HeaderCell>Rented</Table.HeaderCell>
            <Table.HeaderCell>
              <Button disabled={!cart.length} onClick={changeRoute}>
                Cart ({cart.length})
              </Button>
            </Table.HeaderCell>
          </>
        ) : (
          <></>
        )}
      </Table.Row>
    </Table.Header>
  );
};
