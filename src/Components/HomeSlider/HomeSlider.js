import React, {useState} from "react";
import {Link} from "@reach/router";
import MovieSlider from "../MovieSlider/MovieSlider";
import Notify from "../Notification/Notify";
import Img from "react-image";
import VisibilitySensor from "react-visibility-sensor";
import "react-lazy-load-image-component/src/effects/blur.css";
import backdrop300 from "../../backdrop-300.png";
import celeb154 from "./../../celeb-154.png";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./homeslider.css";

const HomeSlider = ({name, data, type, showMore, to, cast}) => {
    const imagePlaceholder = type === "people" ? celeb154 : backdrop300;

    const [favs, updateFavs] = useState(
        JSON.parse(sessionStorage.getItem("favs"))
    );
    const [addToWatchlistLoading, changeAddToWatchlistLoading] = useState(
        false
    );
    const [clickedId, changeClickedId] = useState("");
    const [notification, changeNotification] = useState({
        show: false,
        message: ""
    });
    const [style] = useState(
        type === "people"
            ? {
                  width: "154px",
                  height: "231px",
                  borderRadius: "10px"
              }
            : {
                  height: "169px",
                  width: "300px",
                  borderRadius: "10px"
              }
    );

    const Fav = async (e, index, isFav) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            changeAddToWatchlistLoading(true);
            changeClickedId(data[index].id.toString());
            const isRemoved = await removeFav(data[index].id, type);
            if (isRemoved) {
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                notify("Removed from your watchlist!");
                changeAddToWatchlistLoading(false);
                changeClickedId("");
            }
        } else {
            changeAddToWatchlistLoading(true);
            changeClickedId(data[index].id.toString());
            const isAdded = await addToFav(data[index].id, type);
            if (isAdded) {
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                notify("Added to your watchlist!");
                changeAddToWatchlistLoading(false);
                changeClickedId("");
            }
        }
    };

    const checkFav = index => {
        const id = data[index].id;
        let isFav = false;

        if (favs !== null) {
            favs.forEach(element => {
                if (element.tmdbID === id.toString() && element.type === type) {
                    isFav = true;
                }
            });
        }

        return isFav;
    };

    const notify = message => {
        changeNotification({show: true, message: message});
        setTimeout(() => {
            changeNotification({show: false, message: ""});
        }, 2000);
    };

    return (
        <>
            <h2 className="heading color-orange">
                {name}{" "}
                {showMore && (
                    <Link to={`../${type}`} className="heading-see-more">
                        <span className="heading-see-more">See more</span>
                    </Link>
                )}
            </h2>
            {/* If it isn't cast list then width is changed */}
            <section
                className="home-movie home-width"
                style={cast ? {width: "inherit"} : {}}
            >
                <MovieSlider>
                    {data.map((val, index) => {
                        const background =
                            type === "people"
                                ? `https://image.tmdb.org/t/p/w154/${val.profile_path}`
                                : `https://image.tmdb.org/t/p/w300/${val.backdrop_path}`;
                        const fav = checkFav(index);
                        return (
                            <VisibilitySensor key={val.id}>
                                <Link
                                    to={`${to}${type}/` + val.id}
                                    className="card"
                                >
                                    {localStorage.getItem("authToken") &&
                                        type !== "people" && (
                                            <h1
                                                onClick={async e =>
                                                    Fav(e, index, fav)
                                                }
                                                className="fav"
                                            >
                                                {addToWatchlistLoading &&
                                                val.id.toString() ===
                                                    clickedId ? (
                                                    <div className="spinner">
                                                        <div className="double-bounce1" />
                                                        <div className="double-bounce2" />
                                                    </div>
                                                ) : fav ? (
                                                    // <span role="img" aria-label="love">
                                                    //     &#128155;
                                                    // </span>
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
                                            </h1>
                                        )}
                                    <Img
                                        alt={`${val.title} poster`}
                                        src={[background, imagePlaceholder]}
                                        loader={
                                            <div
                                                style={style}
                                                className="gradient"
                                            ></div>
                                        }
                                        className="card-image"
                                        onError={e =>
                                            (e.target.src = imagePlaceholder)
                                        }
                                    />
                                    <div className="data">
                                        <h4 className="card-movie-name">
                                            {type === "movie"
                                                ? val.title
                                                : val.name}
                                        </h4>
                                        {/* Sub text for movies and TV shows */}
                                        {type !== "people" && (
                                            <h5 className="card-release-date">
                                                {new Date(
                                                    type === "movie"
                                                        ? val.release_date
                                                        : val.first_air_date
                                                ).toDateString()}
                                            </h5>
                                        )}
                                        {/* Sub text for cast */}
                                        {type === "people" && cast && (
                                            <h5 className="card-release-date">
                                                {val.character}
                                            </h5>
                                        )}
                                        {type === "people" && !cast && (
                                            <h5 className="card-release-date">
                                                {val.known_for[0] === null ||
                                                val.known_for[0] === undefined
                                                    ? ""
                                                    : `${
                                                          val.known_for[0]
                                                              .media_type ===
                                                          "movie"
                                                              ? val.known_for[0]
                                                                    .title
                                                              : val.known_for[0]
                                                                    .name
                                                      }`}
                                            </h5>
                                        )}
                                    </div>
                                </Link>
                            </VisibilitySensor>
                        );
                    })}
                </MovieSlider>
            </section>
            <Notify notify={notification.show} message={notification.message} />
        </>
    );
};

export default HomeSlider;
