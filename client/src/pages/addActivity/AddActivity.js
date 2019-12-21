import React, { useState, useCallback } from "react";
import {
  Form,
  FormGroup,
  Input,
  Col,
  Button,
  Label,
  Row,
  Container,
  FormText,
  Card
} from "reactstrap";
import auth from "../../api/auth";
import "./AddActivity.css";
import ReactBodymovin from "react-bodymovin";
import NavBar from "../../components/navBar/NavBar";
import study from "../../assets/anim-json/study";
import rest from "../../assets/anim-json/rest";
import volunteer from "../../assets/anim-json/volunteer";
import grade from "../../assets/anim-json/grade";
import check from "../../assets/anim-json/check";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const studyAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: study
};
const checkAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: check
};
const restAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: rest
};
const volunteerAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: volunteer
};
const gradeAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: grade
};

function AddActivity() {
  //Hooks
  const [userActivity, setUserActivity] = useState(0);
  const [userStartTime, setUserStartTime] = useState(Date.now());
  const [userEndTime, setUserEndTime] = useState(Date.now());
  const [userDesc, setUserDesc] = useState("");
  const [finished, setFinished] = useState(false);

  function submitActivity() {
    console.log(userActivity);
    console.log(userDesc);
    console.log(userStartTime);
    console.log(userEndTime);
  }
  const handleInputField = useCallback(event => {
    setUserDesc(event.target.value);
  });
  const handleStartDate = event => {
      setUserStartTime(event);
  }
  const handleEndDate = event => {
      setUserEndTime(event);
  }
  return (
    <>
      <Container className="view-container">
        <NavBar />
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="activity-holder">
              <div className="title">What do you want to do?</div>
              <Row>
                <Col
                  className="card-holder"
                  onClick={() => {
                    setUserActivity(200);
                  }}
                >
                  <div className="anim-holder">
                    <ReactBodymovin options={studyAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Study</Button>
                  </div>
                </Col>
                <Col
                  className="card-holder"
                  className="card-holder"
                  onClick={() => {
                    setUserActivity(300);
                  }}
                >
                  <div className="anim-holder">
                    <ReactBodymovin options={restAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Rest Up</Button>
                  </div>
                </Col>
                <Col
                  className="card-holder"
                  onClick={() => {
                    setUserActivity(700);
                  }}
                >
                  <div className="anim-holder">
                    <ReactBodymovin options={volunteerAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Volunteer</Button>
                  </div>
                </Col>
                <Col
                  className="card-holder"
                  className="card-holder"
                  onClick={() => {
                    setUserActivity(400);
                  }}
                >
                  <div className="anim-holder">
                    <ReactBodymovin options={gradeAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">New Grade</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="duration-holder">
              <div className="title">How long are you doing it for?</div>
              <Row>
                <Col>
                  <DatePicker
                    selected={userStartTime}
                    onChange={handleStartDate}
                    showTimeSelect
                  />
                </Col>
                <Col>
                  <DatePicker
                    selected={userEndTime}
                    onChange={handleEndDate}
                    showTimeSelect
                  />
                  </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="description-holder">
              <FormGroup className="description-box">
                <div className="title">Anything special to add?</div>
                <Input
                  onChange={handleInputField}
                  type="textarea"
                  name="text"
                  id="descText"
                />
              </FormGroup>
            </div>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="submit-holder">
              <Col className="card-holder">
                <div className="anim-holder">
                  <ReactBodymovin options={checkAnim} />
                </div>
                <div className="btn-holder">
                  <Button color="primary" onClick={submitActivity}>
                    Submit
                  </Button>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddActivity;
