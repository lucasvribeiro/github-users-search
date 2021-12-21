import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import { fetchUser, fetchRepos, fetchStarred } from "../../services/fetchData";

import Card from "../../components/Card/Card";

import "./UserPage.css";
import Repository from "../../components/Repository/Repository";

const { TabPane } = Tabs;

const UserPage = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState();
  const [repos, setRepos] = useState(null);
  const [starred, setStarred] = useState(null);

  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [hasMoreStarred, setHasMoreStarred] = useState(true);

  const [reposPage, setReposPage] = useState(1);
  const [starredPage, setStarredPage] = useState(1);

  const [organizations, setOrganizations] = useState();

  const username = useParams().username;

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const getUser = () => {
    setLoading(true);

    fetchUser(username)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const getRepos = () => {
    console.log("pegando a página:", reposPage);

    fetchRepos(username, reposPage)
      .then((res) => {
        console.log(res.data);
        setReposPage(reposPage + 1);

        if (reposPage === 1) setRepos(res.data);
        else setRepos(repos.concat(res.data));

        if (!res.data.length) {
          setHasMoreRepos(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getStarred = () => {
    console.log("pegando a página:", starredPage);

    fetchStarred(username, starredPage)
      .then((res) => {
        console.log(res.data);
        setStarredPage(starredPage + 1);

        if (starredPage === 1) setStarred(res.data);
        else setStarred(starred.concat(res.data));

        if (!res.data.length) {
          setHasMoreStarred(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://api.github.com/users/${username}/orgs`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setOrganizations(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (username) {
      getUser();
      getRepos();
      getStarred();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Spin spinning={loading}>
      <div className={user ? "user-page expanded" : "user-page"}>
        <div className="user-page-left-container">
          {user && organizations && (
            <Card
              type="full"
              cardStyle="side"
              key={user.id}
              user={user}
              organizations={organizations}
              visible={true}
              showButtons={false}
              showBackLink={true}
              style={{ top: "12vh" }}
            />
          )}
        </div>

        <div className="user-page-right-container">
          <Tabs defaultActiveKey="repos">
            <TabPane
              key="repos"
              id="repos"
              tab={
                <>
                  <i className="fas fa-book" />
                  &nbsp; Repositories
                </>
              }
            >
              {repos && (
                <InfiniteScroll
                  dataLength={repos.length}
                  next={getRepos}
                  hasMore={hasMoreRepos}
                  scrollableTarget="repos"
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
                    <Repository type="list" repository={repo} key={repo.id} />
                  ))}
                </InfiniteScroll>
              )}
            </TabPane>
            <TabPane
              key="starred"
              id="starred"
              tab={
                <>
                  <i className="fas fa-star" />
                  &nbsp; Starred
                </>
              }
            >
              {starred && (
                <InfiniteScroll
                  dataLength={starred.length}
                  next={getStarred}
                  hasMore={hasMoreStarred}
                  scrollableTarget="starred"
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
                    <Repository
                      type="list"
                      repository={starred}
                      key={starred.id}
                    />
                  ))}
                </InfiniteScroll>
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};

export default UserPage;
