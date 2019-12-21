import React, { useEffect, useState } from "react";
import leaderboards from "../../api/leaderboards";
import { Spinner, Col, Row, ListGroup, ListGroupItem, Card } from "reactstrap";

import "./Leaderboards.css";

const Leaderboards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      setIsLoading(true);
      await leaderboards.get(0).then(res => setUsers(res.data));
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
              <ListGroup>
                {users.map((user, index) => {
                  return (
                    <Card>
                      <div>
                        {user.name} {user.surname}
                      </div>
                      <div>{user.exp}XP</div>
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
