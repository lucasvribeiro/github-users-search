import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../../components/SearchBox/SearchBox";

import "./SearchPage.css";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [user, setUser] = useState();
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
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-page">
      <SearchBox
        onChange={searchChanged}
        onClick={goSearch}
        loading={loading}
        user={user}
      />
    </div>
  );
};

export default SearchPage;
