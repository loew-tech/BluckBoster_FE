import React from "react";


export const MovieCard = ({ movie }) => {
  const style = { color: 'gold' }
  return (
    <div>
      <div style={style}>{movie.title}</div>
      <div class="grid-container">
        <div class="grid-item">{movie.director}</div>
        <div class="grid-item">{movie.lead}</div>
        <div class="grid-item">{movie.support}</div>
        <div class="grid-item">Inventory: {movie.inventory}</div>
        <div class="grid-item">Rented: {movie.rented}</div>
      </div>
    </div >
  )
}