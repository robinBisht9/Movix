import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/Image";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const urlForUpcoming = "/movie/upcoming";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch(urlForUpcoming);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  useEffect(() => {
    let randomIndex = data
      ? Math.floor(Math.random() * data.results.length)
      : 0;
    const backGround = url.backdrop + data?.results[randomIndex].backdrop_path;
    setBackground(backGround);
  }, [data, url.backdrop]);

  const handleSearchQuery = (event) => {
    console.log("hello");
    if (event.key === "Enter" && query.length > 0) {
      console.log("handleSearch");
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Image src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
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
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
