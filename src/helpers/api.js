import axios from "axios";

const BASE_URL = "https://slink-staging.herokuapp.com";

const instance = axios.create({
  baseURL: BASE_URL,
});

export function createLink({ url, user }) {
  const params = { url, user };
  return instance
    .put("/api/links", params)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function getLinks({ user }) {
  return instance
    .get("/api/links", { user })
    .then((response) => response.data)
    .catch((error) => error.response);
}
