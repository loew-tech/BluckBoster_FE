export const fetchCart = async () => {
  const user = localStorage.getItem("user");
  const response = await fetch(`http://127.0.0.1:5000/api/movies/cart/${user}`)
  if (response.ok) {
    const existingCart = await response.json()
    return existingCart;
  }
}

export const getUser = async () => {
  const user = localStorage.getItem("user")
  const response = await fetch(`http://127.0.0.1:5000/api/member/${user}`)
  if (response.ok) {
    const member = response.json()
    return member;
  }
}