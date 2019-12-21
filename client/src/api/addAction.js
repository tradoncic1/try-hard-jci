import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  get: (action, model) => axios.post(`${BASE_URL}/addaction/${action}`, model)
};
