import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../components/switchTabs/switchTabs";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
  const { mediatype, id } = useParams();
  const { data: videosData, loading: videosLoading } = useFetch(
    `/${mediatype}/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediatype}/${id}/credits`
  );

  console.log(videosData);
  console.log(credits);
  return (
    <div>
      <DetailsBanner video={videosData?.results?.[0]} crews={credits?.crew} />
    </div>
  );
};

export default Details;
