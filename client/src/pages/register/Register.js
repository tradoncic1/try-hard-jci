import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Row, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import "./Register.css";
import auth from "../../api/auth";

const Register = props => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    dob: "",
    email: "",
    pw: ""
  });

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

    auth.register(input).then(res => {
      props.history.push({
        pathname: "/login",
        state: { user: res.data.user }
      });
    });
  };

  return (
    <div className="Register-Wrap">
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
            <Label>Date of birth</Label>
            <Input type="date" name="dob" id="dob" onChange={handleInput} />
          </FormGroup>
          <Col md={12}>
            <Button type="submit" color="primary" onClick={handleSubmit}>
              register
            </Button>
          </Col>
          <br />
          <br />
          <div>
            Already have an account?
            <br />
            <Link to="/login">Log in here!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
