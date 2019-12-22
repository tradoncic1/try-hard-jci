import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Button, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import auth from "../../api/auth";
import { parseJwt } from "../../utils";

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

  const handleSubmit = async e => {
    e.preventDefault();

    await auth.login(input).then(res => {
      localStorage.setItem("jwt", res.data.jwt);
    });

    props.history.push("/profile");
  };

  const { username, password } = input;

  return localStorage.getItem("jwt") &&
    parseJwt(localStorage.getItem("jwt")).exp >
      Math.floor(Date.now() / 1000) ? (
    <Redirect to="/profile" />
  ) : (
    <div className="Login-Wrap">
      <Row>
        <Col md={7}>
          <div className="Login-Logo-Wrap">
            <h1>TryHard</h1>
          </div>
        </Col>
        <Col md={5}>
          <div className="Login-Form-Wrap">
            <div className="Login-Form">
              <h2>login</h2>
              <Form className="form" onSubmit={handleSubmit}>
                <Col>
                  <FormGroup>
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
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={password}
                      onChange={handleInput}
                    />
                  </FormGroup>
                </Col>
                <Col className="Login-ButtonCol">
                  <Button
                    disabled={!username || !password}
                    type="submit"
                    color="primary"
                    onClick={handleSubmit}
                  >
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
        </Col>
      </Row>
    </div>
  );
};

export default Login;
