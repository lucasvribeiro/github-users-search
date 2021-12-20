import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Modal, Tag } from "antd";

import github from "../../images/github.png";

import "./SearchPage.css";
import { useEffect } from "react/cjs/react.development";

import Button from "../../components/Button/Button";
import Modalr from "../../components/Modalr/Modalr";
import Repository from "../../components/Repository/Repository";

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
      <div className="search-page-header">
        <img src={github} alt="Github" className={user && "hidden"} />
        <h1 className={user ? "search-page-title hidden" : "search-page-title"}>
          Find Users <br />
          from <span style={{ fontWeight: "500" }}>GitHub</span>.
        </h1>
      </div>

      <div
        className={
          user ? "search-page-content has-user" : "search-page-content"
        }
      >
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
              <Button onClick={() => changeModalState("repos")}>
                <i className="fas fa-book" />
                &nbsp;&nbsp;Repositories
              </Button>

              <Button onClick={() => changeModalState("starred")}>
                <i className="fas fa-star" />
                &nbsp;&nbsp;Starred
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modalr
        visible={modalState.state}
        closable={true}
        onCancel={() => changeModalState()}
        title={
          modalState.type === "repos" ? (
            <span className="modal-title">
              <i className="fas fa-book" /> Repositories of {user?.name}
            </span>
          ) : (
            <span className="modal-title">
              <i className="fas fa-star" /> Starred of {user?.name}
            </span>
          )
        }
      >
        <div className="modal-content">
          {modalState.type === "repos"
            ? repos?.map((repo) => (
                <Repository repository={repo} key={repo.id} />
              ))
            : starred?.map((starred) => (
                <Repository repository={starred} key={starred.id} />
              ))}
        </div>
      </Modalr>
    </div>
  );
};

export default SearchPage;
