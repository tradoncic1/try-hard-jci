import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import auth from "../../api/auth";

import "./Login.css";

const Login = props => {
  const [input, setInput] = useState({
    username: props.location.state ? props.location.state.user.username : "",
    password: props.location.state ? props.location.state.user.pw : ""
  });

  const handleInput = event => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setInput(prevInput => ({
      ...prevInput,
      [eventName]: eventValue
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    auth.login(input).then(res => {
      console.log(res.data);
      localStorage.setItem("jwt", res.data.jwt);
    });
  };

  const { username, password } = input;

  return (
    <div className="Login-Wrap">
      <div className="Login-Form">
        <h2>login</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <Label for="username">username</Label>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <Button type="submit" color="primary" onClick={handleSubmit}>
              log in
            </Button>
          </Col>
          <br />
          <br />
          <div>
            Don't have an account?
            <br />
            <Link to="/register">Register here!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
