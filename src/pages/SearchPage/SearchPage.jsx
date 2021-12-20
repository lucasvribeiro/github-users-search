import React, { useState } from "react";
import axios from "axios";

import Button from "../../components/Button/Button";
import Modalr from "../../components/Modalr/Modalr";
import Card from "../../components/Card/Card";
import Repository from "../../components/Repository/Repository";
import SearchBox from "../../components/SearchBox/SearchBox";

import github from "../../images/github.png";

import "./SearchPage.css";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(false);

  const [searchValue, setSearchValue] = useState();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState();
  const [starred, setStarred] = useState();

  const [modalState, setModalState] = useState({ state: false, type: "" });

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const goSearch = () => {
    setLoading(true);

    axios
      .get(`https://api.github.com/users/${searchValue}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);

        setRepos(null);
        setStarred(null);
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
    if (repos) setModalState({ state: true, type: "repos" });
    else {
      setLoadingRepos(true);
      axios
        .get(`https://api.github.com/users/${user.login}/repos`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setRepos(res.data);
          setLoadingRepos(false);
          setModalState({ state: true, type: "repos" });
        })
        .catch((err) => {
          console.log(err.response);
          setLoadingRepos(false);
        });
    }
  };

  const getStarred = () => {
    if (starred) setModalState({ state: true, type: "starred" });
    else {
      setLoadingStarred(true);
      axios
        .get(`https://api.github.com/users/${user.login}/starred`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setStarred(res.data);
          setLoadingStarred(false);
          setModalState({ state: true, type: "starred" });
        })
        .catch((err) => {
          console.log(err.response);
          setLoadingStarred(false);
        });
    }
  };

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

        <Card
          user={user}
          visible={user && true}
          buttons={[
            <Button
              icon="book"
              key="btn-01"
              type="primary"
              loading={loadingRepos}
              disabled={loadingRepos}
              onClick={getRepos}
            >
              Repositories
            </Button>,
            <Button
              icon="star"
              key="btn-02"
              type="primary"
              loading={loadingStarred}
              disabled={loadingStarred}
              onClick={getStarred}
            >
              Starred
            </Button>,
          ]}
        />
      </div>

      <Modalr
        visible={modalState.state}
        closable={true}
        onCancel={() => setModalState({ ...modalState, state: false })}
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
