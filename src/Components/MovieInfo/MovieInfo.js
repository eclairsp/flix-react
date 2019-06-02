import React, {useState, useEffect, useRef} from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import {LazyLoadImage} from "react-lazy-load-image-component";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import placeholderImg from "../../placeholder.jpg";
import celebPlaceholder from "./../../user.svg";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import "./movie-info.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const MovieInfo = props => {
    const [movieInfo, changeMovieInfo] = useState([]);
    const [videoSrc, changeVideoSrc] = useState([]);
    const [cast, changeCast] = useState([]);
    const [similar, changeSimilar] = useState([]);
    const [loaded, changeLoaded] = useState(false);
    const backgroundRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            let urlMovie = `https://api.themoviedb.org/3/movie/${
                props.movieId
            }?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            let urlVideo = `https://api.themoviedb.org/3/movie/${
                props.movieId
            }/videos?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            let urlCast = `
            https://api.themoviedb.org/3/movie/${
                props.movieId
            }/credits?api_key=74d9bb95f2c26a20a3f908c481d10af3`;
            let urlSimilar = `https://api.themoviedb.org/3/movie/${
                props.movieId
            }/similar?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1`;

            fetch(urlMovie)
                .then(res => res.json())
                .then(data => {
                    changeMovieInfo(data);
                });

            fetch(urlVideo)
                .then(res => res.json())
                .then(data => {
                    changeVideoSrc(data.results);
                });

            fetch(urlCast)
                .then(res => res.json())
                .then(data => {
                    delete data.id;
                    changeCast(data);
                });

            fetch(urlSimilar)
                .then(res => res.json())
                .then(data => {
                    changeSimilar(data.results);
                });

            changeLoaded(true);

            if (
                backgroundRef.current !== undefined &&
                window.innerWidth > 600
            ) {
                backgroundRef.current.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${
                    movieInfo.backdrop_path
                })`;
            }
        };

        fetchData();
    }, [movieInfo.backdrop_path, props.movieId]);

    return (
        <Hom>
            {loaded && (
                <>
                    <section className="center-details" ref={backgroundRef}>
                        <section className="details-1">
                            <div className="car">
                                <div className="poster">
                                    <LazyLoadImage
                                        className="poster-main"
                                        src={` https://image.tmdb.org/t/p/w342/${
                                            movieInfo.poster_path
                                        }`}
                                        alt={`${movieInfo.title} poster`}
                                        placeholderSrc={placeholderImg}
                                        effect="blur"
                                    />
                                </div>
                                <article className="movie-main-info">
                                    <h1 className="heading heading-details color-orange">
                                        {movieInfo.title}
                                    </h1>
                                    <h2 className="heading heading-details">
                                        {new Date(
                                            movieInfo.release_date
                                        ).toDateString()}
                                    </h2>
                                    <h2 className="heading heading-details">
                                        Overview,
                                    </h2>
                                    <p className="synopsis">
                                        {movieInfo.overview}
                                    </p>
                                    <h2 className="heading heading-details">
                                        IMDB: 7.1/10
                                    </h2>
                                    <h2 className="heading heading-details">
                                        Rotten Tomatoes: 81%
                                    </h2>
                                </article>
                            </div>
                        </section>
                    </section>
                    <section className="center-next">
                        <section className="movie-main-details">
                            <div className="cast-crew">
                                <h1 className="heading color-orange">
                                    Cast and Crew
                                </h1>
                                <h2 className="heading">
                                    Directed By,{" "}
                                    {cast.crew === undefined
                                        ? "not found"
                                        : cast.crew.map(val => {
                                              if (val.job === "Director") {
                                                  return val.name + " | ";
                                              }
                                              return null;
                                          })}
                                </h2>
                                <h2 className="heading">
                                    Screenplay By,{" "}
                                    {cast.crew === undefined
                                        ? "not found"
                                        : cast.crew.map(val => {
                                              if (val.job === "Screenplay") {
                                                  return val.name + " | ";
                                              }
                                              return null;
                                          })}
                                </h2>
                                <div className="cast">
                                    <MovieSlider>
                                        {cast.cast === undefined
                                            ? "not found"
                                            : cast.cast.map((val, index) => {
                                                  return (
                                                      <div
                                                          className="card card-r"
                                                          key={index}
                                                      >
                                                          <div>
                                                              <LazyLoadImage
                                                                  className="image"
                                                                  src={
                                                                      val.profile_path ===
                                                                      null
                                                                          ? celebPlaceholder
                                                                          : `https://image.tmdb.org/t/p/w154/${
                                                                                val.profile_path
                                                                            }`
                                                                  }
                                                                  alt={val.name}
                                                                  placeholderSrc={
                                                                      celebPlaceholder
                                                                  }
                                                                  effect="blur"
                                                              />
                                                          </div>
                                                          <div>
                                                              <h4 className="cast-name">
                                                                  {val.name}
                                                              </h4>
                                                              <h5 className="cast-name">
                                                                  {
                                                                      val.character
                                                                  }
                                                              </h5>
                                                          </div>
                                                      </div>
                                                  );
                                              })}
                                    </MovieSlider>
                                </div>
                            </div>
                            <div className="trailer">
                                <h1 className="heading color-orange">Videos</h1>
                                <div className="video-slider">
                                    <MovieSlider type="full">
                                        {videoSrc === undefined
                                            ? "no videos found"
                                            : videoSrc
                                                  .reverse()
                                                  .map((val, index) => {
                                                      return (
                                                          <div
                                                              className="video-card"
                                                              key={index}
                                                          >
                                                              <div className="video">
                                                                  <iframe
                                                                      title={`${
                                                                          val.name
                                                                      } trailer`}
                                                                      src={`https://www.youtube-nocookie.com/embed/${
                                                                          val.key
                                                                      }`}
                                                                      frameBorder="0"
                                                                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                      allowFullScreen
                                                                  />
                                                              </div>
                                                          </div>
                                                      );
                                                  })}
                                    </MovieSlider>
                                </div>
                            </div>
                            <div className="all-movie-details">
                                <h1 className="heading color-orange">
                                    Details
                                </h1>
                                <article className="details-main">
                                    <div className="rating">
                                        <h3 className="heading">Rating</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {movieInfo.adult === true
                                                    ? "Adult"
                                                    : "Not Adult"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="genres">
                                        <h3 className="heading">Genres</h3>
                                        <div className="tags">
                                            {movieInfo.genres === undefined
                                                ? "no genre found"
                                                : movieInfo.genres.map(
                                                      (val, index) => {
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className="genre__tag"
                                                              >
                                                                  {val.name}
                                                              </div>
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                    <div className="country">
                                        <h3 className="heading">Tagline</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {movieInfo.tagline}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="language">
                                        <h3 className="heading">Langauge</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {movieInfo.original_language}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="production">
                                        <h3 className="heading">
                                            Production Companies
                                        </h3>
                                        <div className="tags">
                                            {movieInfo.production_companies ===
                                            undefined
                                                ? "no genre found"
                                                : movieInfo.production_companies.map(
                                                      (val, index) => {
                                                          let name = "";
                                                          val.length === 0
                                                              ? (name =
                                                                    "Not found")
                                                              : (name =
                                                                    val.name);
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className="genre__tag"
                                                              >
                                                                  {name}
                                                              </div>
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                    <div className="runtime">
                                        <h3 className="heading">Runtime</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {movieInfo.runtime === undefined
                                                    ? "Not found"
                                                    : `${
                                                          movieInfo.runtime
                                                      } minutes`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="budget">
                                        <h3 className="heading">Budget</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {`${movieInfo.budget} $`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-office">
                                        <h3 className="heading">Box-Office</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {`${movieInfo.revenue} $`}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </section>
                    </section>
                    <section className="recommendations home-width">
                        <div className="recommend-heading-wrapper">
                            <h1 className="heading recommend-heading color-orange">
                                Similar Movies
                            </h1>
                        </div>
                        <MovieSlider>
                            {similar === undefined
                                ? "not found"
                                : similar.map((val, index) => {
                                      return (
                                          <Link
                                              to={"./../../movie/" + val.id}
                                              key={index}
                                              className="card"
                                              onClick={window.scrollTo(0, 0)}
                                          >
                                              <div>
                                                  <LazyLoadImage
                                                      src={
                                                          val.backdrop_path ===
                                                          null
                                                              ? placeholderImg
                                                              : `https://image.tmdb.org/t/p/w300/${
                                                                    val.backdrop_path
                                                                }`
                                                      }
                                                      alt="poster"
                                                      className="card-image"
                                                      placeholderSrc={
                                                          placeholderImg
                                                      }
                                                      effec="blur"
                                                  />
                                                  <div className="data">
                                                      <h3 className="card-movie-name">
                                                          {val.title}
                                                      </h3>
                                                      <h4 className="card-release-date">
                                                          {new Date(
                                                              val.release_date
                                                          ).toDateString()}
                                                      </h4>
                                                  </div>
                                              </div>
                                          </Link>
                                      );
                                  })}
                        </MovieSlider>
                    </section>
                </>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
        </Hom>
    );
};

export default MovieInfo;
