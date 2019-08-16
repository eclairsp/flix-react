import React, {useState} from "react";
import {Link} from "@reach/router";
import MovieSlider from "../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import backdrop300 from "../../backdrop-300.png";
import celeb154 from "./../../celeb-154.png";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./homeslider.css";

const HomeSlider = ({name, data, type, showMore}) => {
    const imagePlaceholder = name === "PEOPLE" ? celeb154 : backdrop300;

    const [favs, updateFavs] = useState(
        JSON.parse(sessionStorage.getItem("favs"))
    );
    const [addToWatchlistLoading, changeAddToWatchlistLoading] = useState(
        false
    );
    const [clickedId, changeClickedId] = useState("");

    const Fav = async (e, index, isFav) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            changeAddToWatchlistLoading(true);
            changeClickedId(data[index].id.toString());
            const isRemoved = await removeFav(data[index].id, type);
            if (isRemoved) {
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
                changeAddToWatchlistLoading(false);
                changeClickedId("");
            }
        } else {
            changeAddToWatchlistLoading(true);
            changeClickedId(data[index].id.toString());
            const isAdded = await addToFav(data[index].id, type);
            if (isAdded) {
                updateFavs(JSON.parse(sessionStorage.getItem("favs")));
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
            <section className="home-movie home-width">
                <MovieSlider>
                    {data.map((val, index) => {
                        const background =
                            name === "PEOPLE"
                                ? `https://image.tmdb.org/t/p/w154/${
                                      val.profile_path
                                  }`
                                : `https://image.tmdb.org/t/p/w300/${
                                      val.backdrop_path
                                  }`;
                        const fav = checkFav(index);
                        return (
                            <Link
                                to={`../${type}/` + val.id}
                                key={val.id}
                                className="card"
                            >
                                {localStorage.getItem("authToken") && (
                                    <h1
                                        onClick={async e => Fav(e, index, fav)}
                                        className="fav"
                                    >
                                        {addToWatchlistLoading &&
                                        val.id.toString() === clickedId ? (
                                            <div className="spinner">
                                                <div className="double-bounce1" />
                                                <div className="double-bounce2" />
                                            </div>
                                        ) : fav ? (
                                            <span role="img" aria-label="love">
                                                &#128155;
                                            </span>
                                        ) : (
                                            <span role="img" aria-label="love">
                                                &#128153;
                                            </span>
                                        )}
                                    </h1>
                                )}
                                <div>
                                    <LazyLoadImage
                                        alt={`${val.title} poster`}
                                        effect="blur"
                                        src={
                                            background === null
                                                ? backdrop300
                                                : background
                                        }
                                        className="card-image"
                                        placeholderSrc={imagePlaceholder}
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
                                        {name !== "PEOPLE" && (
                                            <h5 className="card-release-date">
                                                {new Date(
                                                    type === "movie"
                                                        ? val.release_date
                                                        : val.first_air_date
                                                ).toDateString()}
                                            </h5>
                                        )}
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

export default HomeSlider;
