export const fetchCart = async (username) => {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/members/cart/${username}`
  );
  if (response.ok) {
    const existingCart = await response.json();
    return existingCart;
  }
  return [];
};

export const updateCart = (username, movie_id, cart, removeFromCart) => {
  console.log(`$movie_id=${movie_id}`, `$removeFromCart=${removeFromCart}`);
  let newCart = [...cart];
  if (!removeFromCart) {
    newCart.unshift(movie_id);
    fetch("http://127.0.0.1:8080/api/v1/members/cart", {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
  } else {
    console.log("$$ IN else block");
    fetch("http://127.0.0.1:8080/api/v1/members/cart/remove", {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
    const index = newCart.indexOf(movie_id);
    newCart.splice(index, 1);
  }
  console.log("cart=", cart, "newCart=", newCart);
  return newCart;
};

export const getUser = async () => {
  const user = localStorage.getItem("user");
  const response = await fetch(`http://127.0.0.1:5000/api/member/${user}`);
  if (response.ok) {
    const member = response.json();
    return member;
  }
};
