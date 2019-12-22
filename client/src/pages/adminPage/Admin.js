import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Button,
  Label,
  Spinner,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import "./Admin.css";
import { withRouter } from "react-router";
import { parseJwt, historyMap, historyMapAdmin } from "../../utils";
import profiles from "../../api/profiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

function AdminPage(props) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (
        !localStorage.getItem("jwt") ||
        parseJwt(localStorage.getItem("jwt")).exp <=
          Math.floor(Date.now() / 1000)
      ) {
        props.history.push("/login");
        return;
      }
      const profileResponse = await profiles.get(
        parseJwt(localStorage.getItem("jwt")).username
      );
      if (profileResponse.data.type == 2) props.history.push("/profile");

      const requestResponse = await profiles.getApprovals();

      setRequests(requestResponse.data);

      setIsLoading(false);
    };

    fetchData();
  }, [refresh]);

  const handleApprove = async request => {
    setIsLoading(true);

    await profiles.approve(request.username, request.time);

    setIsLoading(false);
    setRefresh(!refresh);
  };

  const handleDecline = async request => {
    setIsLoading(true);

    await profiles.removeReq(request.username, request.time);

    setIsLoading(false);
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="AdminPage">
        <Row>
          <Col md={12} className="Title">pending approval</Col>
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={8} className="ApprovalContainer">
            {isLoading ? (
              <Spinner />
            ) : (
              <ListGroup>
                {requests.map(request => {
                  return (
                    <ListGroupItem>
                      {historyMapAdmin(request)}
                      <div className="Admin-Icons">
                        <FontAwesomeIcon
                          icon={faCheck}
                          onClick={() => handleApprove(request)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => {
                            handleDecline(request);
                          }}
                        />
                      </div>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    </>
  );
}

export default withRouter(AdminPage);
