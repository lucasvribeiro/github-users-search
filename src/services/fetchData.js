import axios from "axios";

export const BASE_URL = "https://api.github.com/users";

const token = process.env.REACT_APP_GITHUB_TOKEN;
const headers = {
  headers: {
    Authorization: `${token}`,
  },
};

export const fetchUser = async (username) => {
  return await axios.get(`${BASE_URL}/${username}`, headers);
};

export const fetchRepos = async (username, page) => {
  return await axios.get(
    `${BASE_URL}/${username}/repos?sort=updated&page=${page}`,
    headers
  );
};

export const fetchStarred = async (username, page) => {
  return await axios.get(
    `${BASE_URL}/${username}/starred?sort=updated&page=${page}`,
    headers
  );
};
