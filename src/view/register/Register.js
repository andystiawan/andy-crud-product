import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../../network/config";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${URL}/register`, {
        username,
        password,
      });

      const { token } = response.data;

      // Set the JWT token in local storage or session storage
      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } catch (error) {
      // Handle error, display error message, or perform any other actions
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Form className="register-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button className="register-button">Register</Button>
        <div className="d-inline-flex p-2">
          <span>Do you have already account ? </span>
          <Link to={"/Login"}>Login</Link>
        </div>
      </Form>
    </div>
  );
}
