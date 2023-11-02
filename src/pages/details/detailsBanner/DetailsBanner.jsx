import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import Genre from "../../../components/genre/Genre";
import CircleRating from "../../../components/circleRating/CircleRating";
import Image from "../../../components/lazyLoadImage/Image";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayButton } from "../PlayButton";
import CrewDetails from "./CrewDetails";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crews }) => {
  const { mediatype, id } = useParams();
  const baseEndpoint = `/${mediatype}/${id}`;
  const { data, loading } = useFetch(baseEndpoint);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { url } = useSelector((state) => state.home);

  const genres = data?.genres?.map((genre) => genre.id);

  const handleTrailerClick = () => {
    setShow(true);
    setVideoId(video.key);
  };

  const directors = crews?.filter((crew) => crew.job === "Director");
  const writers = crews?.filter(
    (crew) =>
      crew.job === "Screenplay" || crew.job === "Story" || crew.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Image src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Image
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Image className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {data.name || data.title} (
                      {dayjs(data.release_date).format("YYYY")})
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genre data={genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => handleTrailerClick()}
                      >
                        <PlayButton />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.staus && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <div className="text">{data.status}</div>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <div className="text">
                            {dayjs(data.release_date).format("MMMM D, YYYY")}
                          </div>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <div className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                    <CrewDetails crews={directors} name="Director" />
                    <CrewDetails crews={writers} name="Writers" />
                    {data?.created_by?.length > 0 && (
                      <CrewDetails name="Creators" crews={data?.created_by} />
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
