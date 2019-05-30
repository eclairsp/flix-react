import React from "react";
import {Link} from "@reach/router";
import MovieSlider from "./../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import john from "./../../john-300.jpg";
import "./home.css";

const Home = props => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <section className="home">
            <h1 className="heading home-heading color-orange">Popular</h1>
            <h2 className="heading color-orange">
                MOVIES{" "}
                <Link to="../movie" className="heading-see-more">
                    <span className="heading-see-more">See more</span>
                </Link>
            </h2>
            <section className="home-movie home-width">
                <MovieSlider>
                    {arr.map((val, index) => {
                        return (
                            <Link
                                to={"../movie/" + index}
                                key={index}
                                className="card"
                            >
                                <div>
                                    <LazyLoadImage
                                        alt="ppster"
                                        effect="blur"
                                        src={john}
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

            <h2 className="heading color-orange">
                TV-SHOWS{" "}
                <Link to="../movie" className="heading-see-more">
                    <span className="heading-see-more">See more</span>
                </Link>
            </h2>
            <section className="home-tv home-width">
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

            <h2 className="heading color-orange">
                PEOPLE{" "}
                <Link to="../movie" className="heading-see-more">
                    <span className="heading-see-more">See more</span>
                </Link>
            </h2>
            <section className="home-tv home-width">
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
            {/* <section className="home-movie">
                <h1 className="heading color-orange">MOVIES</h1>
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
            <section className="home-tv">
                <h1 className="heading color-orange">TV-SHOWS</h1>
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
            </section>*/}
        </section>
    );
};

export default Home;
