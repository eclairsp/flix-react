import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Helmet} from "react-helmet";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import poster342 from "./../../poster-342.png";
import backdrop300 from "../../backdrop-300.png";
import celeb154 from "./../../celeb-154.png";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./movie-info.css";

const MovieInfo = props => {
    const [movieInfo, changeMovieInfo] = useState([]);
    const [videoSrc, changeVideoSrc] = useState([]);
    const [cast, changeCast] = useState([]);
    const [similar, changeSimilar] = useState([]);
    const [loaded, changeLoaded] = useState(false);
    const [ratings, changeRatings] = useState([]);
    const [background, changeBackground] = useState("none");
    const [isFavourite, changeFavourite] = useState(false);
    const [favs, updateFavs] = useState(
        JSON.parse(sessionStorage.getItem("favs"))
    );

    useEffect(() => {
        const checkFav = async () => {
            const id = props.movieId;

            if (favs !== null) {
                favs.forEach(element => {
                    if (
                        element.tmdbID === id.toString() &&
                        element.type === "movie"
                    ) {
                        changeFavourite(true);
                    }
                });
            }
        };

        const fetchData = async () => {
            let urlMovie = `https://api.themoviedb.org/3/movie/${
                props.movieId
            }?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&append_to_response=videos,credits,similar`;
            // let urlVideo = `https://api.themoviedb.org/3/movie/${
            //     props.movieId
            // }/videos?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            // let urlCast = `
            // https://api.themoviedb.org/3/movie/${
            //     props.movieId
            // }/credits?api_key=74d9bb95f2c26a20a3f908c481d10af3`;
            // let urlSimilar = `https://api.themoviedb.org/3/movie/${
            //     props.movieId
            // }/similar?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1`;

            const response = await fetch(urlMovie);
            const data = await response.json();

            changeMovieInfo(data);
            // if (backgroundRef.current !== null && window.innerWidth > 600) {
            //     backgroundRef.current.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${
            //         data.backdrop_path
            //     })`;
            // }

            changeBackground(
                `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path
                })`
            );

            let trailer = data.videos.results.filter(val => {
                return val.type === "Trailer";
            });

            let teaser = data.videos.results.filter(val => {
                return val.type === "Teaser";
            });

            if (trailer.length === 10) {
                changeVideoSrc([...trailer]);
            } else if (
                teaser.length === 10 - trailer.length ||
                teaser.length < 10 - trailer.length
            ) {
                changeVideoSrc([...trailer, ...teaser]);
            } else {
                changeVideoSrc([
                    ...trailer,
                    ...teaser.slice(0, 10 - trailer.length)
                ]);
            }

            changeCast(data.credits);

            changeSimilar(data.similar.results);

            const rating = [
                {
                    Source: "The Movie Database",
                    Value: data.vote_average.toString() + "/10"
                }
            ];

            const ratings = await fetchRatings(data.imdb_id, rating);
            changeRatings(ratings);

            // fetch(urlVideo)
            //     .then(res => res.json())
            //     .then(data => {
            //         let trailer = data.results.filter(val => {
            //             return val.type === "Trailer";
            //         });

            //         let teaser = data.results.filter(val => {
            //             return val.type === "Teaser";
            //         });

            //         if (trailer.length === 10) {
            //             changeVideoSrc([...trailer]);
            //         } else if (
            //             teaser.length === 10 - trailer.length ||
            //             teaser.length < 10 - trailer.length
            //         ) {
            //             changeVideoSrc([...trailer, ...teaser]);
            //         } else {
            //             changeVideoSrc([
            //                 ...trailer,
            //                 ...teaser.slice(0, 10 - trailer.length)
            //             ]);
            //         }
            //     });

            // fetch(urlCast)
            //     .then(res => res.json())
            //     .then(data => {
            //         delete data.id;
            //         changeCast(data);
            //     });

            // fetch(urlSimilar)
            //     .then(res => res.json())
            //     .then(data => {
            //         changeSimilar(data.results);
            //     });

            changeLoaded(true);
        };

        const fetchRatings = async (imdbId, arr) => {
            const url = `https://www.omdbapi.com/?apikey=ba5af482&i=${imdbId}`;

            const response = await fetch(url);
            const data = await response.json();

            return [...arr, ...data.Ratings];
        };

        fetchData();
        checkFav();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Fav = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavourite) {
            const isRemoved = await removeFav(props.movieId, "movie");
            if (isRemoved) {
                changeFavourite(false);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
            }
        } else {
            const isAdded = await addToFav(props.movieId, "movie");
            if (isAdded) {
                changeFavourite(true);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
            }
        }
    };

    return (
        <>
            {loaded && (
                <>
                    <Helmet>
                        <title>{`${movieInfo.title} (Movie) | FLIX`}</title>
                        <meta name="description" content={movieInfo.overview} />
                    </Helmet>
                    <section
                        className="center-details"
                        style={
                            window.innerWidth < 600
                                ? {}
                                : {backgroundImage: background}
                        }
                    >
                        <section className="details-1">
                            <div className="car">
                                <div className="poster">
                                    <LazyLoadImage
                                        className="poster-main"
                                        src={
                                            movieInfo.backdrop_path === null
                                                ? celeb154
                                                : `https://image.tmdb.org/t/p/w342/${
                                                      movieInfo.poster_path
                                                  }`
                                        }
                                        alt={`${movieInfo.title} poster`}
                                        placeholderSrc={poster342}
                                        effect="blur"
                                        onError={e =>
                                            (e.target.src = poster342)
                                        }
                                    />
                                </div>
                                <article className="movie-main-info">
                                    <h1 className="heading heading-details color-orange">
                                        {movieInfo.title}
                                        &nbsp;&nbsp;
                                        <span
                                            onClick={async e => Fav(e)}
                                            style={{cursor: "pointer"}}
                                        >
                                            {isFavourite ? (
                                                <span
                                                    role="img"
                                                    aria-label="love"
                                                >
                                                    &#128155;
                                                </span>
                                            ) : (
                                                <span
                                                    role="img"
                                                    aria-label="love"
                                                >
                                                    &#128153;
                                                </span>
                                            )}
                                        </span>
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
                                    {ratings === undefined ||
                                    ratings.length === 0
                                        ? "not found"
                                        : ratings.map((val, index) => {
                                              return (
                                                  <h2
                                                      key={index}
                                                      className="heading heading-details"
                                                  >
                                                      {`${val.Source}: ${
                                                          val.Value
                                                      }`}
                                                  </h2>
                                              );
                                          })}
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
                                                                          ? celeb154
                                                                          : `https://image.tmdb.org/t/p/w154/${
                                                                                val.profile_path
                                                                            }`
                                                                  }
                                                                  alt={val.name}
                                                                  placeholderSrc={
                                                                      celeb154
                                                                  }
                                                                  effect="blur"
                                                                  onError={e =>
                                                                      (e.target.src = celeb154)
                                                                  }
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
                                            : videoSrc.map((val, index) => {
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
                                                {movieInfo.tagline ===
                                                    undefined ||
                                                movieInfo.tagline === null ||
                                                movieInfo.tagline === ""
                                                    ? "Not found"
                                                    : movieInfo.tagline}
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
                                                undefined ||
                                            movieInfo.production_companies
                                                .length === 0 ? (
                                                <div className="genre__tag">
                                                    Not Found
                                                </div>
                                            ) : (
                                                movieInfo.production_companies.map(
                                                    (val, index) => {
                                                        let name = "";
                                                        val.length === 0
                                                            ? (name =
                                                                  "Not found")
                                                            : (name = val.name);
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="genre__tag"
                                                            >
                                                                {name}
                                                            </div>
                                                        );
                                                    }
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="runtime">
                                        <h3 className="heading">Runtime</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {movieInfo.runtime ===
                                                    undefined ||
                                                movieInfo.runtime === null
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
                    {similar.length === 0 ? (
                        ""
                    ) : (
                        <section className="recommendations home-width">
                            <div className="recommend-heading-wrapper">
                                <h1 className="heading recommend-heading color-orange">
                                    Similar Movies
                                </h1>
                            </div>
                            <MovieSlider>
                                {similar === undefined
                                    ? ""
                                    : similar.map((val, index) => {
                                          return (
                                              <Link
                                                  to={"./../../movie/" + val.id}
                                                  key={index}
                                                  className="card"
                                                  onClick={window.scrollTo(
                                                      0,
                                                      0
                                                  )}
                                              >
                                                  <div>
                                                      <LazyLoadImage
                                                          src={
                                                              val.backdrop_path ===
                                                              null
                                                                  ? backdrop300
                                                                  : `https://image.tmdb.org/t/p/w300/${
                                                                        val.backdrop_path
                                                                    }`
                                                          }
                                                          alt="poster"
                                                          className="card-image"
                                                          placeholderSrc={
                                                              backdrop300
                                                          }
                                                          effec="blur"
                                                          onError={e =>
                                                              (e.target.src = backdrop300)
                                                          }
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
                    )}
                </>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
        </>
    );
};

export default MovieInfo;
