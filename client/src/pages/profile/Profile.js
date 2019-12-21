import React, { useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { parseJwt, historyMap, privateWrapper } from "../../utils";
import profiles from "../../api/profiles";

import "./Profile.css";
import {
  Col,
  Row,
  Card,
  Progress,
  Spinner,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const Profile = props => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    pw: "",
    dob: "",
    activity: 0,
    exp: 0
  });

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (
        parseJwt(localStorage.getItem("jwt")).exp <=
          Math.floor(Date.now() / 1000) ||
        !localStorage.getItem("jwt")
      ) {
        props.history.push("/login");
        return;
      }

      let profileResponse;
      let levelCalc;
      let xpCalc;
      setIsLoading(true);
      if (props.match.params.username) {
        profileResponse = await profiles.get(props.match.params.username);
        levelCalc = parseInt(profileResponse.data.exp / 75) + 1;
        xpCalc = profileResponse.data.exp - parseInt((levelCalc - 1) * 75);
      } else {
        profileResponse = await profiles.get(
          parseJwt(localStorage.getItem("jwt")).username
        );
        levelCalc = parseInt(profileResponse.data.exp / 75) + 1;
        xpCalc = profileResponse.data.exp - parseInt((levelCalc - 1) * 75);
      }

      setProfileInfo(profileResponse.data);

      setLevel(levelCalc);
      setExperience(xpCalc);

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div className="Profile">
      <div className="Profile-Wrap">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {isLoading ? (
              <div className="Profile-Header">
                <Spinner />
              </div>
            ) : (
              <Card className="Profile-Card">
                <div className="Profile-Header">
                  <h2>
                    {profileInfo.name} {profileInfo.surname}
                  </h2>
                  <p>Title</p>
                </div>
                <div className="Profile-Progression">
                  <div className="Profile-ProgressionText">
                    <h4>Level {level}</h4>
                    <p>
                      {experience}/{75}
                    </p>
                  </div>
                  <Progress value={(experience / 75) * 100} />
                </div>
              </Card>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
        <div className="Profile-Stats">
          <Row>
            <Col md={2} />
            <Col md={8}>
              <div className="Profile-StatsInfo">
                <div className="Profile-History">
                  <h3>History</h3>
                  <ListGroup>
                    {isLoading ? (
                      <div className="Profile-Spinner">
                        <Spinner />
                      </div>
                    ) : (
                      profileInfo.history.map((activity, index) => {
                        return (
                          <ListGroupItem key={index}>
                            {historyMap(activity)}
                          </ListGroupItem>
                        );
                      })
                    )}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col md={2} />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;
