import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  get: (page = null) => axios.get(`${BASE_URL}/getLeaderboard/${page}`)
};
