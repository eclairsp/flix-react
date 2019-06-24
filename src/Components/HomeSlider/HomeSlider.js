import React from "react";
import {Link} from "@reach/router";
import MovieSlider from "../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import backdrop300 from "../../backdrop-300.png";
import celeb154 from "./../../celeb-154.png";

const HomeSlider = ({name, data, type, showMore}) => {
    const imagePlaceholder = name === "PEOPLE" ? celeb154 : backdrop300;
    console.log(data);
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
                    {data.map(val => {
                        const background =
                            name === "PEOPLE"
                                ? `https://image.tmdb.org/t/p/w154/${
                                      val.profile_path
                                  }`
                                : `https://image.tmdb.org/t/p/w300/${
                                      val.backdrop_path
                                  }`;
                        return (
                            <Link
                                to={`../${type}/` + val.id}
                                key={val.id}
                                className="card"
                            >
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
