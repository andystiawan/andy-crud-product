import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../../network/config";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/register`, {
        username,
        password,
      });

      const { token } = response.data;

      // Set the JWT token in local storage or session storage
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      <Loading isLoading={isLoading} />
    </div>
  );
}
