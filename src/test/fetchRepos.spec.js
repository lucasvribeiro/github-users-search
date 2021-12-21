import axios from "axios";
import {
  fetchUser,
  fetchRepos,
  fetchStarred,
  BASE_URL,
} from "../services/fetchData";

jest.mock("axios");

const username = "lucasvribeiro";
const page = 1;

describe("fetchUser", () => {
  it("should return an user", async () => {
    const user = { id: 1, name: "Lucas Ribeiro" };
    axios.get.mockResolvedValueOnce(user);

    const result = await fetchUser(username);

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/${username}`);
    expect(result).toEqual(user);
  });
});

describe("fetchRepos", () => {
  it("should return a repos list", async () => {
    const repos = [
      { id: 1, name: "Node" },
      { id: 2, name: "React" },
    ];
    axios.get.mockResolvedValueOnce(repos);

    const result = await fetchRepos(username, page);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/${username}/repos?sort=updated&page=${page}`
    );
    expect(result).toEqual(repos);
  });
});

describe("fetchStarred", () => {
  it("should return a starred repos list", async () => {
    const starred = [
      { id: 1, name: "Node" },
      { id: 2, name: "React" },
    ];
    axios.get.mockResolvedValueOnce(starred);

    const result = await fetchStarred(username, page);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/${username}/starred?sort=updated&page=${page}`
    );
    expect(result).toEqual(starred);
  });
});
