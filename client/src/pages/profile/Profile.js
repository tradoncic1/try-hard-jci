import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { parseJwt, historyMap } from "../../utils";
import profiles from "../../api/profiles";

import "./Profile.css";
import { Col, Row, Card, Progress, Spinner, ListGroup } from "reactstrap";

const Profile = props => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    pw: "",
    dob: "",
    activity: 0,
    exp: 0,
    history: []
  });

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (
        !localStorage.getItem("jwt") ||
        parseJwt(localStorage.getItem("jwt")).exp <=
          Math.floor(Date.now() / 1000)
      ) {
        props.history.push("/login");
        return;
      }

      let profileResponse;
      let levelCalc;
      let xpCalc;
      let historyRev;
      setIsLoading(true);
      if (props.match.params.username) {
        profileResponse = await profiles.get(props.match.params.username);
        if (profileResponse.data.type == 1) props.history.push("/admin");

        levelCalc = parseInt(profileResponse.data.exp / 75) + 1;
        xpCalc = profileResponse.data.exp - parseInt((levelCalc - 1) * 75);
        historyRev = profileResponse.data.history.reverse();
      } else {
        profileResponse = await profiles.get(
          parseJwt(localStorage.getItem("jwt")).username
        );
        if (profileResponse.data.type == 1) props.history.push("/adminPage");

        levelCalc = parseInt(profileResponse.data.exp / 75) + 1;
        xpCalc = profileResponse.data.exp - parseInt((levelCalc - 1) * 75);
        historyRev = profileResponse.data.history;
      }

      setProfileInfo(profileResponse.data);

      setProfileInfo(prevInfo => ({ ...prevInfo, history: historyRev }));

      setLevel(levelCalc);
      setExperience(xpCalc);

      setIsLoading(false);
    };

    fetchProfile();
  }, [props.match.params.username]);

  return (
    <div className="Profile">
      <div className="Profile-Wrap">
        <Row>
          <Col md={4} />
          <Col md={4}>
            {isLoading ? (
              <div className="Profile-Header">
                <Spinner />
              </div>
            ) : (
              <Card className="Profile-Card">
                <div className="Profile-Header">
                  {profileInfo.avatar ? (
                    <img className="Profile-Img" src={profileInfo.avatar} />
                  ) : (
                    <div className="Profile-Img">
                      {profileInfo.name[0]}
                      {profileInfo.surname[0]}
                    </div>
                  )}
                  <h2>
                    {profileInfo.name} {profileInfo.surname}
                  </h2>
                  <p>Student extraordinare</p>
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
                <div className="Profile-Timers">
                  <div>
                    <h2>{profileInfo.timers.study}</h2>
                    <span>Studying</span>
                  </div>
                  <div>
                    <h2>{profileInfo.timers.rest}</h2>
                    <span>Rest</span>
                  </div>
                  <div>
                    <h2>{profileInfo.timers.volunteering}</h2>
                    <span>Volunteer</span>
                  </div>
                </div>
              </Card>
            )}
          </Col>
          <Col md={4} />
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
                        return historyMap(activity, index);
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
