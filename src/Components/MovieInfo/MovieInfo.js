import React, {useState, useEffect, useCallback} from "react";
import {Link} from "@reach/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import play from "./../../play-icon-18-64.png";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import {placeholderImg} from "../../placeholder.jpg";
import "./movie-info.css";

const MovieInfo = props => {
    const [movieInfo, changeMovieInfo] = useState([]);
    const [videoSrc, changeVideoSrc] = useState(null);
    const [cast, changeCast] = useState([]);
    const [similar, changeSimilar] = useState([]);
    const [cardWidth, changeWidth] = useState(0);

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
                    let first = true;
                    data.results.map(val => {
                        if (val.type === "Trailer" && first) {
                            changeVideoSrc(val.key);
                            first = false;
                        }
                    });
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
        };

        fetchData();
    }, [props.movieId]);

    const cardRef = useCallback(node => {
        if (node !== null) {
            changeWidth(node.offsetWidth);
        }
    }, []);

    return (
        <>
            <div className="center-details">
                <section className="details-1">
                    <div className="car">
                        <div className="poster">
                            <LazyLoadImage
                                className="poster-main"
                                src={` http://image.tmdb.org/t/p/w342/${
                                    movieInfo.poster_path
                                }`}
                                alt={`${props.movieId} poster`}
                                placeholderSrc={placeholderImg}
                            />
                        </div>
                        <article className="movie-main-info">
                            <h1 className="movie-main-name heading heading-details heading-main color-orange">
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
                            <p className="synopsis">{movieInfo.overview}</p>
                            <h2 className="heading heading-details">
                                IMDB: 7.1/10
                            </h2>
                            <h2 className="heading heading-details">
                                Rotten Tomatoes: 81%
                            </h2>
                            <h2 className="heading heading-details">
                                <img src={play} alt="play trailer" />
                            </h2>
                        </article>
                    </div>
                </section>
            </div>
            <div className="center-next">
                <section className="movie-main-details">
                    <div className="cast-crew">
                        <h1 className="heading color-orange">Cast and Crew</h1>
                        <h2 className="heading">
                            Directed By,{" "}
                            {cast.crew === undefined
                                ? "not found"
                                : cast.crew.map(val => {
                                      if (val.job === "Director") {
                                          return val.name + " | ";
                                      }
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
                                  })}
                        </h2>
                        <div className="cast">
                            <MovieSlider width={cardWidth}>
                                {cast.cast === undefined
                                    ? "not found"
                                    : cast.cast.map((val, index) => {
                                          return (
                                              <div
                                                  className="card card-r"
                                                  key={index}
                                                  ref={cardRef}
                                              >
                                                  <div>
                                                      <LazyLoadImage
                                                          className="image"
                                                          src={`http://image.tmdb.org/t/p/w92/${
                                                              val.profile_path
                                                          }`}
                                                          alt={val.name}
                                                          placeholderSrc={
                                                              placeholderImg
                                                          }
                                                      />
                                                  </div>
                                                  <div className="infoo">
                                                      <h5>{val.character}</h5>
                                                      <h5>{val.name}</h5>
                                                  </div>
                                              </div>
                                          );
                                      })}
                            </MovieSlider>
                        </div>
                    </div>
                    <div className="trailer">
                        <h1 className="heading color-orange">Trailer</h1>
                        <div className="info">
                            <div className="video">
                                <iframe
                                    title={`${props.movieId} trailer`}
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube-nocookie.com/embed/${videoSrc}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className="all-movie-details">
                        <h1 className="heading color-orange">Details</h1>
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
                                        : movieInfo.genres.map((val, index) => {
                                              return (
                                                  <div
                                                      key={index}
                                                      className="genre__tag"
                                                  >
                                                      {val.name}
                                                  </div>
                                              );
                                          })}
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
                            <div className="runtime">
                                <h3 className="heading">Runtime</h3>
                                <div className="tags">
                                    <div className="genre__tag">
                                        {movieInfo.runtime === undefined
                                            ? "Not found"
                                            : `${movieInfo.runtime} minutes`}
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
            </div>

            <section className="recommendations home-width">
                <div className="recommend-heading-wrapper">
                    <h1 className="heading recommend-heading color-orange">
                        Similar Movies
                    </h1>
                </div>
                <MovieSlider width={cardWidth}>
                    {similar === undefined
                        ? "not found"
                        : similar.map((val, index) => {
                              console.log(similar);
                              return (
                                  <Link
                                      to={"./../../movie/" + val.id}
                                      key={index}
                                      className="card"
                                      ref={cardRef}
                                      onClick={window.scrollTo(0, 0)}
                                  >
                                      <div>
                                          <LazyLoadImage
                                              src={
                                                  val.backdrop_path === null
                                                      ? placeholderImg
                                                      : `http://image.tmdb.org/t/p/w300/${
                                                            val.backdrop_path
                                                        }`
                                              }
                                              alt="poster"
                                              className="slider-image"
                                              placeholderSrc={placeholderImg}
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
    );
};

export default MovieInfo;
