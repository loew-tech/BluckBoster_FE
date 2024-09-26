import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/members/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/movies/");
    } else {
      setFailedLogin(true);
    }
  };

  return (
    <div style={{ backgroundColor: "gold", height: "175px" }}>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="username"
            label="Username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* @TODO: decide what I want to do about passwords */}
          {/* <Form.Input
                    fluid
                    id='password'
                    label='Password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> */}
        </Form.Group>
        <Button type="submit" onClick={() => login()}>
          Submit
        </Button>
        {failedLogin ? <>failed to login</> : null}
      </Form>
      <div>New to Bluckboster?</div>
      <Button
        disabled={true}
        onClick={() => {
          navigate("/register/");
        }}
      >
        Sign Up!
      </Button>
      <Button onClick={() => navigate("/movies/")}>EXPLORE OUR MOVIES!</Button>
    </div>
  );
};
