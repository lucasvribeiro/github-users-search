import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

import "./UserPage.css";

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
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
        console.log(res.data);
        setUser(res.data);
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
          console.log(res.data);
          setOrganizations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (username) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Spin spinning={loading}>
      <div className="user-page">
        {user && organizations && (
          <Card
            type="full"
            key={user.id}
            user={user}
            organizations={organizations}
            visible={true}
            showButtons={false}
            showBackLink={true}
            style={{ top: "15vh" }}
          />
        )}
      </div>
    </Spin>
  );
};

export default UserPage;
