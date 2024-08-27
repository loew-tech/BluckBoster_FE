import React from "react";
import {
  Route,
  // NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { MoviePage } from "./movies";
import { CheckoutPage } from "./checkout";
import { MemberPage } from "./member";
import { LoginPage } from "./login";
// import { RegisterUserPage } from "./register_user";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login/" element={<LoginPage />} />
        {/* @TODO: Decide what I want to do here and add this */}
        {/* <Route exact path='/register/' element={<RegisterUserPage />} /> */}
        <Route exact path="/movies/" element={<MoviePage />} />
        <Route exact path="/checkout/" element={<CheckoutPage />} />
        <Route exact path="/member/" element={<MemberPage />} />
      </Routes>
    </BrowserRouter>
  );
};
