import React, { useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/luc`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [token]);

  return <div>SearchPage</div>;
};

export default SearchPage;
