import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { parseJwt } from "../../utils";
import profiles from "../../api/profiles";
import NavBar from "../../components/navBar/NavBar";

import "./Profile.css";
import { Col, Row } from "reactstrap";

const Profile = props => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    pw: "",
    dob: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      let profileResponse;
      if (props.match.params.username) {
        profileResponse = await profiles.get(props.match.params.username);
      } else {
        profileResponse = await profiles.get(
          parseJwt(localStorage.getItem("jwt")).username
        );
      }

      setProfileInfo(profileResponse.data);
    };

    fetchProfile();
  }, []);

  console.log(profileInfo);

  return (
    <div className="Profile">
      <NavBar />
      <div className="Profile-Wrap">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <div className="Profile-Header">
              <p>
                {profileInfo.name} {profileInfo.surname}
              </p>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
