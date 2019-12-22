import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";
import logo from "../../assets/logo/logo.png";

import "./NavBar.css";
import { parseJwt } from "../../utils";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapseClose = () => setIsOpen(false);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
  };

  const itemsMarkup = localStorage.getItem("jwt") ? (
    parseJwt(localStorage.getItem("jwt")).type == 1 ? (
      <div className="NavBar-Items">
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/editprofile">Edit Profile</Link>
        </div>
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/login" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div>
    ) : (
      <div className="NavBar-Items">
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/newactivity">Add Activity</Link>
        </div>
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/leaderboards">Leaderboards</Link>
        </div>
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/editprofile">Edit Profile</Link>
        </div>
        <div className="NavBar-Item" onClick={handleCollapseClose}>
          <Link to="/login" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div>
    )
  ) : null;

  return props.history.location.pathname == "/login" ||
    props.history.location.pathname == "/register" ||
    props.history.location.pathname === "/" ? null : (
    <div className="NavBar-Wrapper">
      <div className="NavBar">
        <div className="NavBar-Home">
          <Link to="/">
            <img src={logo} style={{ maxHeight: "75px" }} />
          </Link>
        </div>
        <div className="NavBar-Collapsable">
          <FontAwesomeIcon
            className="NavBar-Collapsable--Icon"
            size="lg"
            icon={faBars}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
        <div
          className="NavBar-Divider"
          style={{ width: isOpen ? "100%" : "0" }}
        />
        {itemsMarkup}
      </div>
      <Collapse isOpen={isOpen}>
        <div className="NavBar-Collapsable--Content">{itemsMarkup}</div>
      </Collapse>
    </div>
  );
};

export default withRouter(NavBar);
