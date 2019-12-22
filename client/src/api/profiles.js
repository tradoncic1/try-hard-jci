import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  get: username => axios.get(`${BASE_URL}/user/${username}`),
  update: (username, body) =>
    axios.post(`${BASE_URL}/updateuser/${username}`, body),
  getApprovals: () => axios.get(`${BASE_URL}/getapprovals`),
  approve: (username, time) =>
    axios.post(`${BASE_URL}/approveactivity/${username}/${time}`),
  removeReq: (username, time) =>
    axios.post(`${BASE_URL}/declineactivity/${username}/${time}`)
};
