import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Modal, Tag } from "antd";

import github from "../../images/github.png";

import "./SearchPage.css";
import { useEffect } from "react/cjs/react.development";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const [user, setUser] = useState();
  const [repos, setRepos] = useState();
  const [starred, setStarred] = useState();

  const [modalState, setModalState] = useState({ state: false, type: "" });

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const changeModalState = (flag) => {
    if (flag) setModalState({ state: !modalState.state, type: flag });
    else setModalState({ ...modalState, state: !modalState });
  };

  const goSearch = () => {
    setLoading(true);

    axios
      .get(`https://api.github.com/users/${searchValue}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const searchChanged = (e) => {
    setSearchValue(e.target.value);
  };

  const getRepos = () => {
    axios
      .get(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getStarred = () => {
    axios
      .get(`https://api.github.com/users/${user.login}/starred`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStarred(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (modalState.state) {
      if (modalState.type === "repos" && !repos) getRepos();
      else if (modalState.type === "starred" && !starred) getStarred();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  return (
    <div className="search-page">
      <img
        src={github}
        alt="Github"
        className={user ? "github-cover hidden" : "github-cover"}
      />
      <h1 className={user ? "search-page-title hidden" : "search-page-title"}>
        Find Users from <span style={{ fontWeight: "500" }}>GitHub</span>.
      </h1>

      <SearchBox
        loading={loading}
        onButtonClick={goSearch}
        onInputChange={searchChanged}
      />

      <div className={user ? "user-card visible" : "user-card"}>
        <div className="top-bar"></div>
        <img src={user?.avatar_url} alt="Avatar" className="user-avatar" />

        <div className="card-content">
          <div className="content-title">
            <h2>{user?.name}</h2>
            <p>@{user?.login}</p>
          </div>

          <div className="content-containers">
            <div className="content-left-container">
              <div>
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>
                &nbsp;&nbsp;<b>{user?.followers}</b> Followers ·{" "}
                <b> {user?.following}</b> Following
              </div>

              <div>
                <span className="icon">
                  <i className="fas fa-building"></i>
                </span>
                &nbsp;&nbsp; {user?.company || "not included"}
              </div>
            </div>

            <div className="content-right-container">
              <div>
                <span className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                &nbsp;&nbsp; {user?.location || "not included"}
              </div>

              <div>
                <span className="icon">
                  <i className="fas fa-globe"></i>
                </span>
                &nbsp;&nbsp; {user?.blog || "not included"}
              </div>
            </div>
          </div>

          <div className="content-links">
            <button
              className="button"
              onClick={() => changeModalState("repos")}
            >
              <span className="icon" style={{ color: "#ffffff" }}>
                <i className="fas fa-book" />
              </span>
              &nbsp;&nbsp;Repositories
            </button>

            <button
              className="button"
              onClick={() => changeModalState("starred")}
            >
              <span className="icon" style={{ color: "#ffffff" }}>
                <i className="fas fa-star" />
              </span>
              &nbsp;&nbsp;Starred
            </button>
          </div>
        </div>
      </div>

      <Modal
        width="60vw"
        title={
          modalState.type === "repos" ? (
            <span style={{ color: "#222222" }}>
              <i style={{ color: "#1178da" }} className="fas fa-book" />{" "}
              Repositories of {user?.name}
            </span>
          ) : (
            <span style={{ color: "#222222" }}>
              <i style={{ color: "#1178da" }} className="fas fa-star" /> Starred
              of {user?.name}
            </span>
          )
        }
        visible={modalState.state}
        closable={true}
        footer={null}
        onCancel={() => changeModalState()}
      >
        <div className="modal-content">
          {modalState.state &&
            (modalState.type === "repos"
              ? repos?.map((repo) => (
                  <div className="repo" key={repo.id}>
                    <div className="repo-left-container">
                      <div className="repo-name">
                        {repo.full_name} &nbsp;{" "}
                        {repo.visibility === "public" && (
                          <Tag color="geekblue" className="public-tag">
                            Public
                          </Tag>
                        )}
                      </div>
                      <div className="repo-description">
                        <span
                          className="icon"
                          style={{ color: "#999999", fontSize: "1rem" }}
                        >
                          <i className="fas fa-align-left" />
                        </span>
                        &nbsp;&nbsp;{repo.description?.substring(0, 50)}...
                      </div>
                      <div className="repo-last-update">
                        <span
                          className="icon"
                          style={{ color: "#999999", fontSize: "1rem" }}
                        >
                          <i className="fas fa-clock" />
                        </span>
                        &nbsp;&nbsp;Last update: {repo.updated_at}
                      </div>
                    </div>

                    <div className="repo-right-container">
                      <Tag className="default-tag" color="gold">
                        <span className="icon">
                          <i className="fas fa-star" />
                        </span>
                        &nbsp;&nbsp;{repo.stargazers_count}
                      </Tag>
                      <Tag className="default-tag" color="green">
                        <span className="icon">
                          <i className="fas fa-eye" />
                        </span>
                        &nbsp;&nbsp;{repo.watchers_count}
                      </Tag>
                      <Tag className="default-tag" color="magenta">
                        <span className="icon">
                          <i className="fas fa-code-branch" />
                        </span>
                        &nbsp;&nbsp;&nbsp;{repo.forks_count}
                      </Tag>
                    </div>
                  </div>
                ))
              : starred?.map((starred) => (
                  <div className="repo" key={starred.id}>
                    <div className="repo-left-container">
                      <div className="repo-name">
                        {starred.full_name} &nbsp;{" "}
                        {starred.visibility === "public" && (
                          <Tag color="geekblue" className="public-tag">
                            Public
                          </Tag>
                        )}
                      </div>
                      <div className="repo-description">
                        <span
                          className="icon"
                          style={{ color: "#999999", fontSize: "1rem" }}
                        >
                          <i className="fas fa-align-left" />
                        </span>
                        &nbsp;&nbsp;{starred.description?.substring(0, 50)}...
                      </div>
                      <div className="repo-last-update">
                        <span
                          className="icon"
                          style={{ color: "#999999", fontSize: "1rem" }}
                        >
                          <i className="fas fa-clock" />
                        </span>
                        &nbsp;&nbsp;Last update: {starred.updated_at}
                      </div>
                    </div>

                    <div className="repo-right-container">
                      <Tag className="default-tag" color="gold">
                        <span className="icon">
                          <i className="fas fa-star" />
                        </span>
                        &nbsp;&nbsp;{starred.stargazers_count}
                      </Tag>
                      <Tag className="default-tag" color="green">
                        <span className="icon">
                          <i className="fas fa-eye" />
                        </span>
                        &nbsp;&nbsp;{starred.watchers_count}
                      </Tag>
                      <Tag className="default-tag" color="magenta">
                        <span className="icon">
                          <i className="fas fa-code-branch" />
                        </span>
                        &nbsp;&nbsp;&nbsp;{starred.forks_count}
                      </Tag>
                    </div>
                  </div>
                )))}
        </div>
      </Modal>
    </div>
  );
};

export default SearchPage;
