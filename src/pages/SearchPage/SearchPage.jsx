import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Modal } from "antd";

import github from "../../images/github.png";

import "./SearchPage.css";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [user, setUser] = useState();
  const [modalState, setModalState] = useState(false);
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const changeModalState = () => {
    setModalState(!modalState);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      goSearch();
    }
  };

  const afterOpenModal = () => {
    console.log("abriu");
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

  return (
    <div className="search-page">
      <img
        src={github}
        alt="Github"
        className={user ? "github-cover hidden" : "github-cover"}
      />
      <h1 className={user ? "search-page-title hidden" : "search-page-title"}>
        Find Users from <b>GitHub</b>.
      </h1>

      <SearchBox
        onChange={searchChanged}
        onKeyDown={handleKeyDown}
        onClick={goSearch}
        loading={loading}
        user={user}
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
            <button className="button" onClick={changeModalState}>
              <span className="icon" style={{ color: "#ffffff" }}>
                <i className="fas fa-book" />
              </span>
              &nbsp;&nbsp;Repositories
            </button>

            <button className="button" onClick={changeModalState}>
              <span className="icon" style={{ color: "#ffffff" }}>
                <i className="fas fa-star" />
              </span>
              &nbsp;&nbsp;Starred
            </button>
          </div>
        </div>
      </div>

      <Modal
        title="Basic Modal"
        visible={modalState}
        closable={true}
        footer={null}
        onCancel={changeModalState}
      >
        modal de teste
      </Modal>
    </div>
  );
};

export default SearchPage;
