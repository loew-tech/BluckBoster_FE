import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import { getUser } from '../utils/utils';

export const CheckoutPage = () => {
  const user = localStorage.getItem("user");
  const [cart, setCart] = useState([])
  const [movies, setMovies] = useState([])
  const [member, setMember] = useState('')

  const navigate = useNavigate();

  const checkout = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/cart/checkout/',
      {
        method: 'POST', mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: user })
      })
    console.log(`checkout response=${JSON.stringify(response)}`)
    navigate('/movies/');
  }


  const fetchCart = useCallback(async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/cart/${user}`)
    if (response.ok) {
      const existingCart = await response.json()
      setCart(existingCart)
    }
  }, [user])

  const fetchCartMovies = useCallback(async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/cart/movies?movies=${cart}`)
    if (response.ok) {
      const cartMovies = await response.json()
      setMovies(cartMovies);
    }
  }, [cart])


  useEffect(() => {
    getUser().then((member) => {
      setMember(member)
    })
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  useEffect(() => {
    if (cart.length) {
      fetchCartMovies()
    } else {
      setMovies([])
    }
  }, [cart, fetchCartMovies])

  // // @TODO move this function into utility file
  const updateCart = (id, removeFromCart) => {
    console.log(`movie_id=${id}`)
    let newCart = [...cart]
    if (!removeFromCart) {
      newCart = newCart.unshift(id)
      fetch('http://127.0.0.1:5000/api/cart/add/',
        { method: 'post', body: JSON.stringify({ member_id: user, movie_id: id }) })
    } else {
      fetch('http://127.0.0.1:5000/api/cart/remove/',
        { method: 'post', body: JSON.stringify({ member_id: user, movie_id: id }) })
      const index = newCart.indexOf(id)
      newCart.splice(index, 1);
    }
    setCart(newCart)
  };

  return (
    <div style={{ backgroundColor: 'darkblue' }}>
      <div style={{ backgroundColor: 'gold', height: '150px' }}>
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
        </ul>
      </div>
      <Table striped>
        <Table.Body>
          {
            movies.map((movie) => {
              return (
                <Table.Row key={`${movie.title}-${movie.movie_id}`}>
                  <Table.Cell style={{ fontWeight: 1000, fontSize: 'large' }}>{movie.title}</Table.Cell>
                  <Table.Cell><Button onClick={() => { updateCart(movie.movie_id, true) }}>Remove From Cart</Button></Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
      <div className="container">
        <div className="center">
          <Button onClick={() => { checkout() }}>Checkout</Button>
        </div>
      </div>
    </div>
  )
}
