import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGI5YzZjZDY4YzBkNTE3OTYxY2MzZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjI0NjgxNSwiZXhwIjoxNjYyNTA2MDE1fQ.ON_BMxiVH2rvfBVXBkpbaVow3sPaCefaT0FMYDiHBwo";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
