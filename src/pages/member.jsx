import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';

import { getUser } from '../utils/utils';

export const MemberPage = () => {

  const [member, setMember] = useState("")
  const [rentals, setRentals] = useState([])

  const user = localStorage.getItem("user");

  // const navigate = useNavigate

  useEffect(() => {
    getUser().then((member) => {
      setMember(member)
    })
  }, [])

  const getRentals = useCallback(async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/rentals/movies/${user}`)
    if(response.ok){
      const rentedMovies = await response.json()
      setRentals(rentedMovies)
    }
}, [user])

const returnAllRentals = async () => {
  // @TODO: is this the right way to do this?
  const member_id = localStorage.getItem("user")
  console.log(`returning all movies for ${member_id}`)
  const response = await fetch(`http://127.0.0.1:5000/api/rentals/returns/${member_id}`, {method: "POST"})

  if (response.ok) {
    getRentals()
      // useNavigate('/movies/')
  }
}

const returnRental = async (member_id, movie_id) => {
  const response = await fetch(`http://127.0.0.1:5000/api/rentals/return/${member_id}/${movie_id}`, {method: "POST"})

  if (response.ok) {
      getRentals()
  }
}

// @TODO: add logic for logging out
const logout = async () => {
  console.log('logout btn pressedd')
  // useNavigate('/login/') // @TODO: this redirect is causing errors if uncommented.
}

  useEffect(() => {
    getRentals()
  }, [getRentals])

  console.log(`Member=${member}`)

  return (
    <div>
      <div style={{ backgroundColor: 'gold', height: '200px' }}>
        <ul className='MemberBanner'>
        <li style={{ fontWeight: 1000, fontSize: 'large', padding: '15px' }}>
            <a href='/movies/'>Back to Movies</a>
        </li>
          <li style={{ fontWeight: 1000, fontSize: 'large', padding: '15px' }}>
            <a href='/member/'>
              {member.first_name} {member.last_name}
            </a> 
          </li>
          <li style={{ fontWeight: 1000, fontSize: 'large' }}>  Currently rented: {member.currently_rented}</li>
          <li>
            <Button onClick={logout}>Logout</Button>
          </li>
        </ul>
      </div>
      <Table striped>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Title</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell><button disabled={!rentals.length} onClick={()=>returnAllRentals()}>Return All Movies</button></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            rentals.map((e, index) => {
              console.log(e, index)
              return (
                <Table.Row key={`${e.movie_id}-${index}`}>
                  <Table.Cell style={{ fontWeight: 1000, fontSize: 'large' }}>{e.title}</Table.Cell>
                  {/* TODO: need to format due_date to just be month, day, year */}
                  <Table.Cell style={{ fontWeight: 1000, fontSize: 'large' }}>{e.due_date}</Table.Cell>
                  <Table.Cell><Button onClick={()=>{returnRental(e.member_id, e.movie_id)}}>Return Movie</Button></Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
  )
}