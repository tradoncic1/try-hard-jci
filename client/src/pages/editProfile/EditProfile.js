import React, { useState, useEffect } from "react";
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
import { withRouter } from "react-router";
import { parseJwt } from "../../utils";
import profiles from "../../api/profiles";

import "./EditProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const EditProfile = props => {
  const [user, setUser] = useState({});
  const [input, setInput] = useState({
    email: "",
    pw: "",
    username: "",
    university: "",
    avatar: "",
    password: "",
    new_password: ""
  });
  const [wrongPassword, setWrongPassword] = useState(false);

  const jwtUsername = parseJwt(localStorage.getItem("jwt")).username;

  const { email, pw, university, avatar, username, password } = input;

  useEffect(() => {
    const fetchUser = async () => {
      if (
        !localStorage.getItem("jwt") ||
        parseJwt(localStorage.getItem("jwt")).exp <=
          Math.floor(Date.now() / 1000)
      ) {
        props.history.push("/login");
        return;
      }

      await profiles.get(jwtUsername).then(res => {
        setUser(res.data);
        setInput(res.data);
      });
    };

    fetchUser();
  }, []);

  const handleInput = event => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setInput(prevInput => ({
      ...prevInput,
      [eventName]: eventValue
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setWrongPassword(false);

    await profiles
      .update(jwtUsername, input)
      .then(res => {
        localStorage.setItem("jwt", res.data.jwt);
      })
      .catch(error => {
        if (error.response.status === 406) setWrongPassword(true);
      });
  };

  return (
    <div className="EditProfile-Wrap">
      <Row>
        <Col md={2} />
        <Col md={8}>
          <div className="EditProfile-Form-Wrap">
            <div className="EditProfile-Form">
              <div className="EditProfile-Title">
                <FontAwesomeIcon className="EditProfile-Icon" icon={faCog} />
                <h2>Edit Profile</h2>
              </div>
              <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={handleInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={handleInput}
                  />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">Old Password</Label>
                      <Input
                        type="password"
                        name="pw"
                        id="pw"
                        placeholder="********"
                        onChange={handleInput}
                        invalid={wrongPassword}
                      />
                      <FormFeedback>Incorrect password</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">New Password</Label>
                      <Input
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder="********"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>University of study</Label>
                  <Input
                    type="text"
                    name="university"
                    id="university"
                    value={university}
                    onChange={handleInput}
                  />
                </FormGroup>
                <Button type="submit" color="info" onClick={handleSubmit}>
                  Confirm changes
                </Button>
              </Form>
            </div>
          </div>
        </Col>

        <Col md={2} />
      </Row>
    </div>
  );
};

export default withRouter(EditProfile);
