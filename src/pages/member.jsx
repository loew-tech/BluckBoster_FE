import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../utils/utils";

export const MemberPage = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState("");
  const [rentals, setRentals] = useState([]);
  console.log("$$ member=", member);
  const [currentlyRented, setCurrentlyRented] = useState(0);

  useEffect(() => {
    getUser().then((user) => {
      setMember(user);
      setCurrentlyRented(user.checked_out.length);
    });
  }, []);

  const getCheckedoutMovies = useCallback(async () => {
    if (member) {
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/members/${member.username}/checkedout`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("$$ data=", data);
        setRentals(data);
      }
    }
  }, [member]);

  useEffect(() => {
    getCheckedoutMovies();
  }, [getCheckedoutMovies]);

  const logout = async () => {
    console.log("logout btn pressedd");
    localStorage.removeItem("user");
    navigate("/login/");
  };

  const returnRental = async (movie_id) => {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/members/return",
      {
        method: "POST",
        body: JSON.stringify({
          username: member.username,
          movie_ids: [movie_id],
        }),
      }
    );
    console.log("$$ status=", response.status, response.ok);
    if (response.ok) {
      setRentals(rentals.filter((m) => m.id !== movie_id));
      setCurrentlyRented(currentlyRented - 1);
      const user = JSON.parse(localStorage.getItem("user"));
      const index = user.checked_out.indexOf(movie_id);
      if (-1 < index) {
        user.checked_out = user.checked_out.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      // @TODO: error message for failed return
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "gold", height: "200px" }}>
        <ul className="MemberBanner">
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}>
            <a href="/movies/">Back to Movies</a>
          </li>
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}>
            <a href="/member/">
              {member.first_name} {member.last_name}
            </a>
          </li>
          <li
            style={{ fontWeight: 1000, fontSize: "large", paddingLeft: "15px" }}
          >
            {" "}
            Currently rented: {currentlyRented}
          </li>
          <li>
            <Button onClick={logout}>Logout</Button>
          </li>
        </ul>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            {/* <Table.HeaderCell>Due Date</Table.HeaderCell> */}
            <Table.HeaderCell>
              <button
                disabled={!rentals.length}
                // onClick={() => returnAllRentals()}
              >
                Return All Movies
              </button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rentals.map((movie, i) => {
            console.log(`key=${i}-${movie.id}`, movie, rentals);
            return (
              <Table.Row key={`${i}-${movie.id}`}>
                <Table.Cell style={{ fontWeight: 1000, fontSize: "large" }}>
                  {movie.title}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      returnRental(movie.id);
                    }}
                  >
                    Return Movie
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
