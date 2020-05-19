import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";
import Img from "react-image";
import {Helmet} from "react-helmet";
import posed, {PoseGroup} from "react-pose";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import Notify from "../Notification/Notify";
import poster342 from "./../../poster-342.png";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import NotFound from "../NotFound/NotFound";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeSlider from "../HomeSlider/HomeSlider";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./../MovieInfo/movie-info.css";
import "./tv-info.css";

const VideoContainer = posed.div({
    enter: {opacity: 1},
    exit: {opacity: 0},
});

const TvInfo = (props) => {
    const [tvInfo, changeTvInfo] = useState([]);
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
        message: "",
    });
    const [isValidTv, changeIsValidTv] = useState(true);

    useEffect(() => {
        const checkFav = async () => {
            const id = props.tvId;

            if (favs !== null) {
                favs.forEach((element) => {
                    if (
                        element.tmdbID === id.toString() &&
                        element.type === "tv"
                    ) {
                        changeFavourite(true);
                    }
                });
            }
        };

        const fetchData = async () => {
            let urlMovie = `https://api.themoviedb.org/3/tv/${props.tvId}?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&append_to_response=videos,credits,similar,external_ids`;
            // let urlVideo = `https://api.themoviedb.org/3/tv/${
            //     props.tvId
            // }/videos?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            // let urlCast = `
            // https://api.themoviedb.org/3/tv/${
            //     props.tvId
            // }/credits?api_key=74d9bb95f2c26a20a3f908c481d10af3`;
            // let urlSimilar = `https://api.themoviedb.org/3/tv/${
            //     props.tvId
            // }/similar?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1`;

            const response = await fetch(urlMovie);
            const data = await response.json();

            if ("status_code" in data) {
                return data.status_code === 34 && changeIsValidTv(false);
            }

            changeTvInfo(data);
            changeBackground(
                `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
            );

            let videos = data.videos.results.filter((val) => {
                return val.site === "YouTube";
            });

            changeVideoSrc([...videos]);
            changeCast(data.credits);
            changeSimilar(data.similar.results);

            const rating = [
                {
                    Source: "The Movie Database",
                    Value: data.vote_average.toString() + "/10",
                },
            ];

            const ratings = await fetchRatings(
                data.external_ids.imdb_id,
                rating
            );
            changeRatings(ratings);

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

    const Fav = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavourite) {
            changeAddToWatchlistLoading(true);
            const isRemoved = await removeFav(props.tvId, "tv");
            if (isRemoved) {
                changeFavourite(false);
                notify(`Removed ${tvInfo.name} from your watchlist!`);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                changeAddToWatchlistLoading(false);
            }
        } else {
            changeAddToWatchlistLoading(true);
            const isAdded = await addToFav(props.tvId, "tv");
            if (isAdded) {
                changeFavourite(true);
                notify(`Added ${tvInfo.name} to your watchlist!`);
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                changeAddToWatchlistLoading(false);
            }
        }
    };

    const notify = (message) => {
        changeNotification({show: true, message: message});
        setTimeout(() => {
            changeNotification({show: false, message: ""});
        }, 2000);
    };

    const loadVideo = (index) => {
        let copy = [...videoToLoad];
        copy[index] = true;
        changeVideoToLoad(copy);

        console.log("index", index, videoToLoad);
    };

    return (
        <>
            {loaded && isValidTv && (
                <>
                    <Helmet>
                        <title>{`${tvInfo.name} (TV) | FLIXI`}</title>
                        <meta name="description" content={tvInfo.overview} />
                        <title>{`${tvInfo.title} (Movie) | FLIXI`}</title>
                        <meta name="description" content={tvInfo.overview} />
                        <meta name="Description" content={tvInfo.overview} />
                        <meta name="twitter:card" content="summary" />
                        <meta
                            property="og:url"
                            content="https://flixi.netlify.app/"
                        />
                        <meta property="og:title" content="Movie | Flixi" />
                        <meta
                            property="og:description"
                            content={tvInfo.overview}
                        />
                        <meta
                            property="og:image"
                            content={`https://image.tmdb.org/t/p/w342/${tvInfo.poster_path}`}
                        />
                    </Helmet>
                    <div
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
                                            `https://image.tmdb.org/t/p/w342/${tvInfo.poster_path}`,
                                            poster342,
                                        ]}
                                        loader={
                                            <div
                                                style={{
                                                    height: "513px",
                                                    width: "342px",
                                                    borderRadius: "10px",
                                                }}
                                                className="gradient"
                                            ></div>
                                        }
                                        alt={`${tvInfo.title} poster`}
                                        onError={(e) =>
                                            (e.target.src = poster342)
                                        }
                                    />
                                </div>
                                <article className="movie-main-info">
                                    <h1 className="heading heading-details color-orange">
                                        {tvInfo.name}
                                        &nbsp;&nbsp;
                                        {localStorage.getItem("authToken") && (
                                            <span
                                                onClick={async (e) => Fav(e)}
                                                style={{cursor: "pointer"}}
                                            >
                                                {addToWatchlistLoading ? (
                                                    <div class="spinner">
                                                        <div class="double-bounce1" />
                                                        <div class="double-bounce2" />
                                                    </div>
                                                ) : isFavourite &&
                                                  localStorage.getItem(
                                                      "authToken"
                                                  ) ? (
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
                                            tvInfo.first_air_date
                                        ).toDateString()}
                                    </h2>
                                    <h2 className="heading heading-details">
                                        Overview,
                                    </h2>
                                    <p className="synopsis">
                                        {tvInfo.overview}
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
                    </div>
                    <section className="season">
                        <Link
                            to={`./../season/${props.tvId}/${tvInfo.name}/${tvInfo.number_of_seasons}`}
                            className="season-link"
                        >
                            <h1 className="all-season color-orange">
                                Season Information
                            </h1>
                        </Link>
                    </section>
                    <div className="center-next">
                        <section className="movie-main-details">
                            <div className="cast-crew">
                                <h1 className="heading color-orange">
                                    Cast and Crew
                                </h1>
                                <h2 className="heading">
                                    Created By,{" "}
                                    {tvInfo.created_by === undefined
                                        ? "not found"
                                        : tvInfo.created_by.map((val) => {
                                              return val.name + " | ";
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
`,
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
                                        <h3 className="heading">Seasons</h3>
                                        <div className="tags">
                                            <Link
                                                to={`./../season/${props.tvId}/${tvInfo.name}/${tvInfo.number_of_seasons}`}
                                                className="season-link"
                                            >
                                                <div className="genre__tag">
                                                    {tvInfo.number_of_seasons}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="genres">
                                        <h3 className="heading">Genres</h3>
                                        <div className="tags">
                                            {tvInfo.genres === undefined
                                                ? "no genre found"
                                                : tvInfo.genres.map(
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
                                    <div className="production">
                                        <h3 className="heading">
                                            Production Companies
                                        </h3>
                                        <div className="tags">
                                            {tvInfo.production_companies ===
                                            undefined
                                                ? "no genre found"
                                                : tvInfo.production_companies.map(
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
                                        <h3 className="heading">
                                            Total episodes
                                        </h3>
                                        <div className="tags">
                                            <Link
                                                to={`./../season/${props.tvId}/${tvInfo.name}/${tvInfo.number_of_seasons}`}
                                                className="season-link"
                                            >
                                                <div className="genre__tag">
                                                    {tvInfo.number_of_episodes}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="budget">
                                        <h3 className="heading">Type</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.type}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-office">
                                        <h3 className="heading">Status</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.status}
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
                                Similar TV-Shows
                            </h1>
                        </div>
                        {similar === undefined ? (
                            "not found"
                        ) : (
                            <HomeSlider
                                data={similar}
                                type="tv"
                                showMore={false}
                                to="./../../"
                            />
                        )}
                    </section>
                </>
            )}
            {!loaded && isValidTv && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
            {!isValidTv && <NotFound message="No TV-Show found!" />}
            <Notify notify={notification.show} message={notification.message} />
        </>
    );
};

export default TvInfo;
