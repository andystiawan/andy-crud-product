import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../network/config";
import "./Login.css";
import Loading from "../../component/Loading/Loading";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    localStorage.clear();
    try {
      const response = await axios.post(`${URL}/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Form className="login-form" onSubmit={handleSubmit}>
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

        <Button>Login</Button>

        <div className="d-inline-flex p-2">
          <span> Don't have an account? </span>
          <Link to={"/Register"}>Register</Link>
        </div>
      </Form>
      <Loading isLoading={isLoading} />
    </div>
  );
}
