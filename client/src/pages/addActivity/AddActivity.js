import React, { useState } from "react";
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

const studyAnim = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: study
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
  return (
    <>
      <Container className="view-container">
        <NavBar />
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="activity-holder">
                <div className="title">What do you want to do?</div>
              <Row>
                <Col className="card-holder">
                  <div className="anim-holder">
                    <ReactBodymovin options={studyAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Study</Button>
                  </div>
                </Col>
                <Col className="card-holder">
                  <div className="anim-holder">
                    <ReactBodymovin options={restAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Rest Up</Button>
                  </div>
                </Col>
                <Col className="card-holder">
                  <div className="anim-holder">
                    <ReactBodymovin options={volunteerAnim} />
                  </div>
                  <div className="btn-holder">
                    <Button color="primary">Volunteer</Button>
                  </div>
                </Col>
                <Col className="card-holder">
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
              <Row>
                <Col>
                  <h4>Study</h4>
                </Col>
                <Col>
                  <h4>Rest Up</h4>
                </Col>
                <Col>
                  <h4>Volunteer</h4>
                </Col>
                <Col>
                  <h4>Enter a grade</h4>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="description-holder"></div>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="submit-holder">
              <Button>Submit</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddActivity;
