import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../components/switchTabs/switchTabs";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Recommendation from "./carousels/Recommendation";
import Similar from "./carousels/Similar";

const Details = () => {
  const { mediatype, id } = useParams();
  const { data: videosData, loading: videosLoading } = useFetch(
    `/${mediatype}/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediatype}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={videosData?.results?.[0]} crews={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={videosData} loading={videosLoading} />
      <Similar mediatype={mediatype} id={id} />
      <Recommendation mediatype={mediatype} id={id} />
    </div>
  );
};

export default Details;
