import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recommendation = ({ mediatype, id }) => {
  const { data, loading } = useFetch(`/${mediatype}/${id}/recommendations`);
  console.log(data?.results);
  return (
    <div className="carouselSection">
      {data?.results?.length > 0 && (
        <>
          <ContentWrapper>
            <span className="carouselTitle">Recommendation</span>
          </ContentWrapper>
          <Carousel
            data={data?.results}
            loading={loading}
            endpoint={mediatype}
          />
        </>
      )}
    </div>
  );
};

export default Recommendation;
