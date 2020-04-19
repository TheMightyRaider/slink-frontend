import axios from "axios";

const BASE_URL = "https://slink-staging.herokuapp.com";

const instance = axios.create({
  baseURL: BASE_URL,
});

export function createLink({ url, user }) {
  const params = { url, user };
  return instance.put("/api/links", params).then((response) => response.data);
}

export function getLinks(params) {
  return instance
    .get("/api/links", { params })
    .then((response) => response.data);
}
