import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Similar = ({ mediatype, id }) => {
  const mediaType = mediatype === "movie" ? "Movies" : "Tv Shows";
  const { data, loading } = useFetch(`/${mediatype}/${id}/similar`);
  return (
    <div className="carouselSection">
      {data?.results?.length > 0 && (
        <>
          <ContentWrapper>
            <span className="carouselTitle">Similar {mediaType}</span>
          </ContentWrapper>
          <Carousel
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
          />
        </>
      )}
    </div>
  );
};

export default Similar;
