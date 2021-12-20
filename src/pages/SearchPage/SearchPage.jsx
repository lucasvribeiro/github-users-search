import React, { useState, useEffect } from "react";
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
  const [searchValue, setSearchValue] = useState();

  const [user, setUser] = useState(null);
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

        <Card
          user={user}
          visible={user && true}
          buttons={[
            <Button key="btn-01" onClick={() => changeModalState("repos")}>
              <i className="fas fa-book" />
              &nbsp;&nbsp;Repositories
            </Button>,
            <Button key="btn-02" onClick={() => changeModalState("starred")}>
              <i className="fas fa-star" />
              &nbsp;&nbsp;Starred
            </Button>,
          ]}
        />
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
