import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/notFound/NotFound";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    apiTesting();
    genreCalls();
  }, []);
  const apiTesting = () =>
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });

  const genreCalls = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenre = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenre[item.id] = item));
    });

    dispatch(getGenres(allGenre));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediatype/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
