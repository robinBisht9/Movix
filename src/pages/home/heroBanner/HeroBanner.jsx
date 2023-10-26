import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchQuery = (event) => {
    console.log("hello");
    if (event.key === "Enter" && query.length > 0) {
      console.log("handleSearch");
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of TV shows, Movies and Celebrities to discover. Explore
            now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or Tv Show ... "
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(event) => handleSearchQuery(event)}
            />
            <button onClick={(event) => handleSearchQuery(event)}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
