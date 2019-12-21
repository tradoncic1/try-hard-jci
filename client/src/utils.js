import React from "react";
import { ListGroupItem } from "reactstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarCheck,
  faBed,
  faMugHot,
  faPeopleCarry,
  faGlasses
} from "@fortawesome/free-solid-svg-icons";

export const BASE_URL = "http://192.168.1.104:4200";

export const parseJwt = token => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const historyMap = (activity, index) => {
  switch (activity[2]) {
    case 100:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faMugHot} />
            Woke up on time!
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 200:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faBook} />
            Worked hard!
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 300:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faBed} />
            Took some time to rest
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 400:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faGlasses} />
            Got a 6 from a class
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 401:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faGlasses} />
            Got a 7 from a class
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 402:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faGlasses} />
            Got an 8 from a class
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 403:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faGlasses} />
            Got a 9 from a class
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 404:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faGlasses} />
            Got a 10 from a class!
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 500:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faCalendarCheck} />
            Got to the end of the semester!
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 600:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faBook} />
            Was active for 5 consecutive days
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
    case 700:
      return (
        <ListGroupItem key={index}>
          <div>
            <FontAwesomeIcon icon={faPeopleCarry} />
            Participated in volunteer work
          </div>
          <div>{moment(activity[1]).fromNow()}</div>
        </ListGroupItem>
      );
  }
};
