import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import Card from "../../components/Card/Card";

import "./UserPage.css";
import Repository from "../../components/Repository/Repository";

const { TabPane } = Tabs;

const UserPage = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState();
  const [repos, setRepos] = useState();
  const [starred, setStarred] = useState();

  const [organizations, setOrganizations] = useState();

  const username = useParams().username;

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const getUser = () => {
    setLoading(true);

    axios
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const getRepos = () => {
    axios
      .get(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const getStarred = () => {
    axios
      .get(
        `https://api.github.com/users/${username}/starred?sort=updated&per_page=100`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        setStarred(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
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
          setLoading(false);
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
              tab={
                <>
                  <i className="fas fa-book" />
                  &nbsp; Repositories
                </>
              }
              key="repos"
            >
              {repos?.map((repos) => (
                <Repository repository={repos} key={repos.id} type="list" />
              ))}
            </TabPane>
            <TabPane
              tab={
                <>
                  <i className="fas fa-star" />
                  &nbsp; Starred
                </>
              }
              key="starred"
            >
              {starred?.map((starred) => (
                <Repository repository={starred} key={starred.id} type="list" />
              ))}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};

export default UserPage;
