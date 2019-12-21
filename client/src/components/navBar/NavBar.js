import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

import "./NavBar.css";

const NavBar = props => {
  console.log(props);
  const NAV_COL = "rgba(31, 16, 247, 0.65)";

  const [navColor, setNavColor] = useState("lightseagreen");
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapseClose = () => setIsOpen(false);

  const listenScrollEvent = e => {
    if (window.scrollY > 275) {
      setNavColor(NAV_COL);
    } else {
      setNavColor("lightseagreen");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const itemsMarkup = (
    <div className="NavBar-Items">
      <div className="NavBar-Item" onClick={handleCollapseClose}>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="NavBar-Item" onClick={handleCollapseClose}>
        <Link to="/login" onClick={handleLogOut}>
          Log Out
        </Link>
      </div>
    </div>
  );

  return props.history.location.pathname == "/login" ||
    props.history.location.pathname == "/register" ? null : (
    <div className="NavBar-Wrapper" style={{ backgroundColor: navColor }}>
      <div className="NavBar">
        <div className="NavBar-Home">
          <Link to="/">TryHard</Link>
        </div>
        <div className="NavBar-Collapsable">
          <FontAwesomeIcon
            className="NavBar-Collapsable--Icon"
            size="lg"
            icon={faBars}
            onClick={() => {
              setIsOpen(!isOpen);
              window.scrollY < 275 && isOpen
                ? setNavColor("")
                : setNavColor(NAV_COL);
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
