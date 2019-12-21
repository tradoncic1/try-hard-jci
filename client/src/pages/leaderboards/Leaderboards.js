import React, { useEffect, useState } from "react";
import leaderboards from "../../api/leaderboards";
import { Spinner, Col, Row, ListGroup, Card, Progress } from "reactstrap";

import "./Leaderboards.css";
import { parseJwt } from "../../utils";
import { Redirect, withRouter } from "react-router";

const Leaderboards = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (
      !localStorage.getItem("jwt") ||
      parseJwt(localStorage.getItem("jwt")).exp <= Math.floor(Date.now() / 1000)
    ) {
      props.history.push("/login");
      return;
    }
    const fetchLeaderboards = async () => {
      setIsLoading(true);
      await leaderboards.get(0).then(res => {
        setFirst(res.data[0]);
        setSecond(res.data[1]);
        setThird(res.data[2]);
        setUsers(res.data.slice(2));
      });
      setIsLoading(false);
    };

    fetchLeaderboards();
  }, []);

  console.log(users);

  return (
    <div className="Leaderboards">
      <Row>
        <Col md={2} />
        <Col md={8}>
          {isLoading ? (
            <div className="Leaderboards-Wrap">
              <Spinner />
            </div>
          ) : (
            <div className="Leaderboards-Wrap">
              <h1>Best of the best!</h1>
              <Card className="Leaderboards-First">
                <Row>
                  {first.avatar ? (
                    <img className="Leaderboards-FirstImg" src={first.avatar} />
                  ) : (
                    <div className="Leaderboards-FirstImg">
                      {first.name[0]}
                      {first.surname[0]}
                    </div>
                  )}
                  <div>{first.exp}XP</div>
                  <div>
                    {first.name} {first.surname}
                  </div>
                </Row>
              </Card>
              <Card className="Leaderboards-Second Leaderboards-Row">
                <div>
                  2.{" "}
                  {second.avatar ? (
                    <img className="Leaderboards-UserImg" src={second.avatar} />
                  ) : (
                    <div className="Leaderboards-UserImg">
                      {second.name[0]}
                      {second.surname[0]}
                    </div>
                  )}{" "}
                  <div className="Leaderboard-Name">
                    {second.name} {second.surname}
                  </div>
                </div>
                <div>{third.exp}XP</div>
              </Card>
              <Card className="Leaderboards-Third Leaderboards-Row">
                <div>
                  3.{" "}
                  {third.avatar ? (
                    <img className="Leaderboards-UserImg" src={third.avatar} />
                  ) : (
                    <div className="Leaderboards-UserImg">
                      {third.name[0]}
                      {third.surname[0]}
                    </div>
                  )}{" "}
                  <div className="Leaderboard-Name">
                    {third.name} {third.surname}
                  </div>
                </div>
                <div>{third.exp}XP</div>
              </Card>
              <ListGroup>
                {users.map((user, index) => {
                  return (
                    <Card key={index} className="Leaderboards-Row">
                      <div>
                        {index + 4}.
                        {user.avatar ? (
                          <img
                            className="Leaderboards-UserImg"
                            src={user.avatar}
                          />
                        ) : (
                          <div className="Leaderboards-UserImg">
                            {user.name[0]}
                            {user.surname[0]}
                          </div>
                        )}
                        <div className="Leaderboard-Name">
                          {user.name} {user.surname}
                        </div>
                      </div>
                      <div className="Leaderboards-XP">{user.exp}XP</div>
                    </Card>
                  );
                })}
              </ListGroup>
            </div>
          )}
        </Col>
        <Col md={2} />
      </Row>
    </div>
  );
};

export default Leaderboards;
