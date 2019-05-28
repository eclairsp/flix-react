import React from "react";
import {Link} from "@reach/router";
import MovieSlider from "../MovieSlider/MovieSlider";
import "./movie-home.css";
import john from "./../../john-300.jpg";

const MovieHome = props => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <div>
            <h1>Top Rated</h1>
            <Link to="../movie/123">Go</Link>
            <section>
                <MovieSlider>
                    {arr.map((val, index) => {
                        return (
                            <Link
                                to={"../movie/" + index}
                                key={index}
                                className="card"
                            >
                                <div>
                                    <img
                                        src={john}
                                        alt="poster"
                                        className="slider-image"
                                    />
                                    <div className="data">
                                        <h3 className="card-movie-name">
                                            John wick {val}
                                        </h3>
                                        <h4 className="card-release-date">
                                            24 May, 2019
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </MovieSlider>
            </section>

            <MovieSlider>
                {arr.map((val, index) => {
                    return (
                        <Link
                            to={"../movies/" + val}
                            className="card"
                            key={index}
                        >
                            <div>
                                <img src={john} alt="poster" />
                                <div className="data">
                                    <h3 className="card-movie-name">
                                        John Wick {val}
                                    </h3>
                                    <h4 className="card-release-date">
                                        24 May, 2019
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </MovieSlider>
        </div>
    );
};

export default MovieHome;
