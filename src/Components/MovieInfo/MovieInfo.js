import React, {useState, useEffect} from "react";
import Img from "react-image";
import {Helmet} from "react-helmet";
import posed, {PoseGroup} from "react-pose";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import Notify from "../Notification/Notify";
import poster342 from "./../../poster-342.png";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import HomeSlider from "../HomeSlider/HomeSlider";
import NotFound from "../NotFound/NotFound";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import numberToBoxOffice from "../Utils/NumberToBoxOffice";
import "./movie-info.css";

const VideoContainer = posed.div({
    enter: {opacity: 1},
    exit: {opacity: 0}
});

const MovieInfo = props => {
    const [movieInfo, changeMovieInfo] = useState([]);
    const [videoSrc, changeVideoSrc] = useState([]);
    const [cast, changeCast] = useState([]);
    const [similar, changeSimilar] = useState([]);
    const [loaded, changeLoaded] = useState(false);
    const [ratings, changeRatings] = useState([]);
    const [background, changeBackground] = useState("none");
    const [isFavourite, changeFavourite] = useState(false);
    const [videoToLoad, changeVideoToLoad] = useState([]);
    const [favs, updateFavs] = useState(
        JSON.parse(sessionStorage.getItem("favs"))
    );
    const [addToWatchlistLoading, changeAddToWatchlistLoading] = useState(
        false
    );
    const [notification, changeNotification] = useState({
        show: false,
        message: ""
    });
    const [isValidMovie, changeIsValidMovie] = useState(true);

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
            let urlMovie = `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&append_to_response=videos,credits,similar`;

            const response = await fetch(urlMovie);
            const data = await response.json();

            if ("status_code" in data) {
                return data.status_code === 34 && changeIsValidMovie(false);
            }

            changeMovieInfo(data);
            // if (backgroundRef.current !== null && window.innerWidth > 600) {
            //     backgroundRef.current.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${
            //         data.backdrop_path
            //     })`;
            // }

            changeBackground(
                `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
            );

            let videos = data.videos.results.filter(val => {
                return val.site === "YouTube";
            });

            changeVideoSrc([...videos]);
            changeVideoToLoad([...Array(videos.length).fill(false)]);
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
            changeAddToWatchlistLoading(true);
            const isRemoved = await removeFav(props.movieId, "movie");
            if (isRemoved) {
                changeFavourite(false);
                notify(`Removed ${movieInfo.title} from your watchlist!`);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                changeAddToWatchlistLoading(false);
            }
        } else {
            changeAddToWatchlistLoading(true);
            const isAdded = await addToFav(props.movieId, "movie");
            if (isAdded) {
                changeFavourite(true);
                notify(`Added ${movieInfo.title} to your watchlist!`);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                changeAddToWatchlistLoading(false);
            }
        }
    };

    const notify = message => {
        changeNotification({show: true, message: message});
        setTimeout(() => {
            changeNotification({show: false, message: ""});
        }, 2000);
    };

    const loadVideo = index => {
        let copy = [...videoToLoad];
        copy[index] = true;
        changeVideoToLoad(copy);

        console.log("index", index, videoToLoad);
    };

    return (
        <>
            {loaded && isValidMovie && (
                <>
                    <Helmet>
                        <title>{`${movieInfo.title} (Movie) | FLIXI`}</title>
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
                                    <Img
                                        className="poster-main"
                                        src={[
                                            `https://image.tmdb.org/t/p/w342/${movieInfo.poster_path}`,
                                            poster342
                                        ]}
                                        loader={
                                            <div
                                                style={{
                                                    height: "513px",
                                                    width: "342px",
                                                    borderRadius: "10px"
                                                }}
                                                className="gradient"
                                            ></div>
                                        }
                                        alt={`${movieInfo.title} poster`}
                                        onError={e =>
                                            (e.target.src = poster342)
                                        }
                                    />
                                </div>
                                <article className="movie-main-info">
                                    <h1 className="heading heading-details color-orange">
                                        {movieInfo.title}
                                        &nbsp;&nbsp;
                                        {localStorage.getItem("authToken") && (
                                            <span
                                                onClick={async e => Fav(e)}
                                                style={{cursor: "pointer"}}
                                            >
                                                {addToWatchlistLoading ? (
                                                    <div class="spinner">
                                                        <div class="double-bounce1" />
                                                        <div class="double-bounce2" />
                                                    </div>
                                                ) : isFavourite ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        width="40"
                                                        height="40"
                                                        fill="#f9a602"
                                                    >
                                                        <path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        width="40"
                                                        height="40"
                                                        fill="#fff"
                                                    >
                                                        <path d="M363 277h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z" />
                                                        <path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256c0-44.3 17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" />
                                                    </svg>
                                                )}
                                            </span>
                                        )}
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
                                    ratings.length === 0 ||
                                    ratings[0].Value === "0/10" ? (
                                        <h2 className="heading heading-details">
                                            No ratings found
                                        </h2>
                                    ) : (
                                        ratings.map((val, index) => {
                                            return (
                                                <h2
                                                    key={index}
                                                    className="heading heading-details"
                                                >
                                                    {`${val.Source}: ${val.Value}`}
                                                </h2>
                                            );
                                        })
                                    )}
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
                                    <HomeSlider
                                        name=""
                                        data={cast.cast}
                                        showMore={false}
                                        type="people"
                                        to=""
                                        cast={true}
                                    />
                                </div>
                            </div>
                            <div className="trailer">
                                <h1 className="heading color-orange">Videos</h1>
                                <div className="video-slider">
                                    <MovieSlider type="full">
                                        {videoSrc === undefined ? (
                                            <h2 className="heading">
                                                No videos found
                                            </h2>
                                        ) : (
                                            videoSrc.map((val, index) => {
                                                return (
                                                    <div
                                                        className="video-wrapper"
                                                        key={index}
                                                    >
                                                        <PoseGroup>
                                                            {videoToLoad[
                                                                index
                                                            ] ? (
                                                                <VideoContainer
                                                                    key="video"
                                                                    className="video-card"
                                                                >
                                                                    <div className="video">
                                                                        <iframe
                                                                            title={`${val.name} trailer`}
                                                                            src={`https://www.youtube-nocookie.com/embed/${val.key}?autoplay=1&mute=1`}
                                                                            frameBorder="0"
                                                                            allow="autoplay;accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                            allowFullScreen
                                                                        />
                                                                    </div>
                                                                </VideoContainer>
                                                            ) : (
                                                                <VideoContainer
                                                                    key="video-thumbnail"
                                                                    className="video-card video-image-card"
                                                                    onClick={() =>
                                                                        loadVideo(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <Img
                                                                        src={[
                                                                            `https://img.youtube.com/vi/${val.key}/hqdefault.jpg
`
                                                                        ]}
                                                                        className="video-load-image"
                                                                    />

                                                                    <svg
                                                                        className="video-load"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 512 512"
                                                                    >
                                                                        <path d="M96 52v408l320-204L96 52z" />
                                                                    </svg>
                                                                </VideoContainer>
                                                            )}
                                                        </PoseGroup>
                                                    </div>
                                                );
                                            })
                                        )}
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
                                                    : `${movieInfo.runtime} minutes`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="budget">
                                        <h3 className="heading">Budget</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {`${numberToBoxOffice(
                                                    movieInfo.budget
                                                )} $`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-office">
                                        <h3 className="heading">Box-Office</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {`${numberToBoxOffice(
                                                    movieInfo.revenue
                                                )} $`}
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
                            {similar === undefined ? (
                                "not found"
                            ) : (
                                <HomeSlider
                                    data={similar}
                                    type="movie"
                                    showMore={false}
                                    to="./../../"
                                />
                            )}
                        </section>
                    )}
                </>
            )}
            {!loaded && isValidMovie && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
            {!isValidMovie && <NotFound message="No movie found!" />}
            <Notify notify={notification.show} message={notification.message} />
        </>
    );
};

export default MovieInfo;
