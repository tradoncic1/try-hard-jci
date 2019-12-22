import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Button,
  Label,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import auth from "../../api/auth";
import { parseJwt } from "../../utils";
import logo from "../../assets/logo/logo.png";

import "./Register.css";

const Register = props => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [input, setInput] = useState({
    name: "",
    surname: "",
    dob: "",
    email: "",
    pw: "",
    university: "",
    username: "",
    password: "",
    type: 2
  });
  const [error, setError] = useState(false);

  const handleInput = event => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setInput(prevInput => ({
      ...prevInput,
      [eventName]: eventValue
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setError(false);

    auth
      .register(input)
      .then(res => {
        props.history.push({
          pathname: "/login",
          state: { user: res.data.user }
        });
      })
      .catch(error => setError(true));
  };

  const isEmailValid = emailRegex.test(input.email);

  const inputsInvalid =
    !input.name || !input.surname || !input.username || !input.password
      ? true
      : false;

  return localStorage.getItem("jwt") &&
    parseJwt(localStorage.getItem("jwt")).exp >
      Math.floor(Date.now() / 1000) ? (
    <Redirect to="/profile" />
  ) : (
    <div className="Register-Wrap">
      <Row>
        <Col md={6}>
          <div className="Register-Logo-Wrap">
            <img src={logo} />
          </div>
        </Col>
        <Col md={6}>
          <div className="Register-Form-Wrap">
            <div className="Register-Form">
              <h2>register</h2>
              <Form className="form" onSubmit={handleSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">first name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="surname">last name</Label>
                      <Input
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder="Smith"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="email">email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    onChange={handleInput}
                    invalid={input.email.length > 0 && !isEmailValid}
                  />
                  <FormFeedback>Please enter a valid email</FormFeedback>
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="username">username</Label>
                      <Input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="username"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">password</Label>
                      <Input
                        type="password"
                        name="pw"
                        id="pw"
                        placeholder="********"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>date of birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    id="dob"
                    onChange={handleInput}
                  />
                </FormGroup>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>university of study</Label>
                      <Input
                        type="text"
                        name="university"
                        id="university"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>position</Label>
                      <Input
                        type="select"
                        name="type"
                        id="type"
                        value={input.type}
                        onChange={handleInput}
                      >
                        <option value={2}>Student</option>
                        <option value={1}>Admin</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {input.type == 1 ? (
                  <FormGroup>
                    <Label>phone number</Label>
                    <Input name="phone" id="phone" onChange={handleInput} />
                  </FormGroup>
                ) : null}
                <Col className="Register-ButtonCol">
                  <Button type="submit" color="primary" onClick={handleSubmit}>
                    register
                  </Button>
                </Col>
                {error ? (
                  <div className="Register-Error">
                    That user already exists!
                  </div>
                ) : null}
                <div>
                  Already have an account?
                  <br />
                  <Link to="/login">Log in here!</Link>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
