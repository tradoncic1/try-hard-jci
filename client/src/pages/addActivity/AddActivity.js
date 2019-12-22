import React, { useState, useCallback, useEffect } from "react";
import {
  Input,
  Col,
  Label,
  Row,
  Spinner
} from "reactstrap";
import "./AddActivity.css";
import "react-datepicker/dist/react-datepicker.css";
import { parseJwt } from "../../utils";
import addAction from "../../api/addAction";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBed,
  faPeopleCarry,
  faGlasses,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

const AddActivity = props => {
  //Hooks
  const [userActivity, setUserActivity] = useState(0);
  const [userDesc, setUserDesc] = useState("");
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (
      !localStorage.getItem("jwt") ||
      parseJwt(localStorage.getItem("jwt")).exp <= Math.floor(Date.now() / 1000)
    ) {
      setTimeout(() =>
      props.history.push("/login")
      , 1500) 
      return;
    }
  }, []);

  const submitActivity = async () => {
    let model = {
      username: parseJwt(localStorage.getItem("jwt")).username,
      time: time,
      desc: userDesc
    };

    await addAction
      .get(userActivity, model)
      .then(() => {
        setFinished(true);

        setTime(0);
        setUserDesc("");
        setUserActivity(0);

        props.history.push("/profile");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTime = event => {
    setTime(event.target.value);
  };

  const handleInputField = useCallback(event => {
    setUserDesc(event.target.value);
  });

  return (
    <div className="AddActivity">
      <Row className="AddActivity-Row">
        <Col md={6} className="AddActivity-Activities">
          <Row className="AddActivity-RowMinor">
            <Col
              xs={6}
              className="AddActivity-Study Activity"
              onClick={() => setUserActivity(200)}
            >
              <FontAwesomeIcon icon={faBook} />
              Study
              {userActivity == 200 ?
              ( <FontAwesomeIcon icon={faCheck} style={{fontSize: "32px"}}/>):(null)}
            </Col>
            <Col
              xs={6}
              className="AddActivity-Rest Activity"
              onClick={() => setUserActivity(300)}
            >
              <FontAwesomeIcon icon={faBed} />
              Rest
              {userActivity == 300 ?
              ( <FontAwesomeIcon icon={faCheck} style={{fontSize: "32px"}}/>):(null)}
            </Col>
          </Row>
          <Row className="AddActivity-RowMinor">
            <Col
              xs={6}
              className="AddActivity-Volunteer Activity"
              onClick={() => setUserActivity(700)}
            >
              <FontAwesomeIcon icon={faPeopleCarry} />
              Volunteer
              {userActivity == 700 ?
              ( <FontAwesomeIcon icon={faCheck} style={{fontSize: "32px"}}/>):(null)}
            </Col>
            <Col
              xs={6}
              className="AddActivity-Grade Activity"
              onClick={() => setUserActivity(400)}
            >
              <FontAwesomeIcon icon={faGlasses} />
              Grade
              {userActivity == 400 ?
              ( <FontAwesomeIcon icon={faCheck} style={{fontSize: "32px"}}/>):(null)}
            </Col>
          </Row>
        </Col>
        <Col md={6} className="AddActivity-Time">
          {userActivity === 0 ? (
            <div>Select an activity</div>
          ) : userActivity === 200 ? (
            <div>
              How much time did you spend studying?
              <Input type="number" min={0} max={12} onChange={handleTime} />
              <span style={{ fontSize: "18px" }}>
                (Enter the amount in hours)
              </span>
            </div>
          ) : userActivity === 300 ? (
            <div>
              How much time did you spend resting?
              <Input type="number" min={0} onChange={handleTime} />
              <span style={{ fontSize: "18px" }}>
                (Enter the amount in hours)
              </span>
            </div>
          ) : userActivity === 700 ? (
            <div>
              How much time did you spend volunteering?
              <Input type="number" min={0} onChange={handleTime} />
              <span style={{ fontSize: "18px" }}>
                (Enter the amount in hours)
              </span>
            </div>
          ) : (
            <div>
              What grade did you get?
              <Input type="number" min={5} max={10} onChange={handleTime} />
              <span style={{ fontSize: "18px" }}></span>
            </div>
          )}
        </Col>
      </Row>
      <Row className="AddActivity-Row">
        <Col md={6} className="AddActivity-Description">
          <Label>Something to add?</Label>
          <Input type="textarea" onChange={handleInputField} />
        </Col>
        <Col md={6} className="AddActivity-Submit" onClick={submitActivity}>
          <span
            style={{
              color:
                userActivity === 0 || time === 0
                  ? "rgba(0, 0, 0, 0.2)"
                  : "white"
            }}
          >
            submit
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(AddActivity);
