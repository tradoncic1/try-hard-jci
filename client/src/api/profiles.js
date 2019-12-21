import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  get: username => axios.get(`${BASE_URL}/user/${username}`)
};
