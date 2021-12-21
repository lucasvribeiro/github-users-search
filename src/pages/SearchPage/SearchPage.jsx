import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { message, Spin } from "antd";

import Button from "../../components/Button/Button";
import Modalr from "../../components/Modalr/Modalr";
import Card from "../../components/Card/Card";
import Repository from "../../components/Repository/Repository";
import SearchBox from "../../components/SearchBox/SearchBox";

import { fetchUser, fetchRepos, fetchStarred } from "../../services/fetchData";

import github from "../../images/github.png";

import "./SearchPage.css";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(false);

  const [searchValue, setSearchValue] = useState();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [starred, setStarred] = useState(null);

  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [hasMoreStarred, setHasMoreStarred] = useState(true);

  const [reposPage, setReposPage] = useState(1);
  const [starredPage, setStarredPage] = useState(1);

  const [modalState, setModalState] = useState({ state: false, type: "" });

  const searchChanged = (e) => {
    setSearchValue(e.target.value);
  };

  const resetStates = () => {
    setRepos(null);
    setStarred(null);

    setReposPage(1);
    setStarredPage(1);

    setHasMoreRepos(true);
    setHasMoreStarred(true);
  };

  const goSearch = () => {
    setLoading(true);
    resetStates();

    fetchUser(searchValue)
      .then((res) => {
        setUser(res.data);
        setLoading(false);

        setRepos(null);
        setStarred(null);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          message.error("404: Usuário não encontrado.");
        }
      });
  };

  const getRepos = () => {
    setLoadingRepos(true);

    fetchRepos(user.login, reposPage)
      .then((res) => {
        setModalState({ state: true, type: "repos" });
        setReposPage(reposPage + 1);

        if (reposPage === 1) setRepos(res.data);
        else setRepos(repos.concat(res.data));

        if (!res.data.length) {
          setHasMoreRepos(false);
        }

        setLoadingRepos(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoadingRepos(false);
      });
  };

  const getStarred = () => {
    setLoadingStarred(true);

    fetchStarred(user.login, starredPage)
      .then((res) => {
        setModalState({ state: true, type: "starred" });
        setStarredPage(starredPage + 1);

        if (starredPage === 1) setStarred(res.data);
        else setStarred(starred.concat(res.data));

        if (!res.data.length) {
          setHasMoreStarred(false);
        }

        setLoadingStarred(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoadingStarred(false);
      });
  };

  return (
    <div className={user ? "search-page expanded" : "search-page"}>
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
          showGoProfilePageLink={true}
          buttons={[
            <Button
              icon="book"
              key="btn-01"
              type="primary"
              color="#111111"
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
              color="#111111"
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
        id="scrollableDiv"
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
        {modalState.type === "repos"
          ? repos && (
              <InfiniteScroll
                dataLength={repos.length}
                next={getRepos}
                hasMore={hasMoreRepos}
                scrollableTarget="scrollableDiv"
                loader={
                  <div
                    style={{
                      width: "100%",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spin size="middle" />
                  </div>
                }
              >
                {repos?.map((repo) => (
                  <Repository repository={repo} key={repo.id} />
                ))}
              </InfiniteScroll>
            )
          : starred && (
              <InfiniteScroll
                dataLength={starred.length}
                next={getStarred}
                hasMore={hasMoreStarred}
                scrollableTarget="scrollableDiv"
                loader={
                  <div
                    style={{
                      width: "100%",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spin size="middle" />
                  </div>
                }
              >
                {starred.map((starred) => (
                  <Repository repository={starred} key={starred.id} />
                ))}
              </InfiniteScroll>
            )}
      </Modalr>
    </div>
  );
};

export default SearchPage;
