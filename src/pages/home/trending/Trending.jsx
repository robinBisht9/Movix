import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/switchTabs";
import { useFetch } from "../../../hooks/useFetch";

const filterData = ["Day", "Week"];
const trendingAllBaseUrl = "/trending/all/";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(trendingAllBaseUrl + endpoint);
  const onTabChange = (tab) => {
    setEndpoint(tab.toLowerCase());
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={filterData} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
