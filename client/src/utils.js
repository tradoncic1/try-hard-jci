import { Redirect } from "react-router";
import React from "react";

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

export const historyMap = activity => {
  switch (activity[2]) {
    case 100:
      return "Woke up on time!";
    case 200:
      return "Worked hard!";
    case 300:
      return "Took some time to rest.";
    case 400:
      return "Got a 6 from a class.";
    case 401:
      return "Got a 7 from a class.";
    case 402:
      return "Got an 8 from a class.";
    case 403:
      return "Got a 9 from a class.";
    case 404:
      return "Got a 10 from a class!";
    case 500:
      return "Got to the end of the semester!";
    case 600:
      return "Was active for a 5 consecutive days!";
    case 700:
      return "Participated in volunteer work!";
  }
};
