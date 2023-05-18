import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../network/config";
import Loading from "../../component/Loading/Loading";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    setIsLoading(true);
    const response = await axios.post(`${URL}/login`, {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    setIsLoading(false);
    navigate("/", { replace: true });
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
