import React from "react";
import {Link} from "@reach/router";
import shazam from "./../../shazam1.jpg";
import play from "./../../play-icon-18-64.png";
import levi from "./../../levi.jpg";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import john from "./../../john-300.jpg";
import "./movie-info.css";

const MovieInfo = props => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <>
            <div className="center-details">
                <section className="details-1">
                    <div className="car">
                        <div className="poster">
                            <img
                                className="poster-main"
                                src={shazam}
                                alt={`${props.movieId} poster`}
                            />
                        </div>
                        <article className="movie-main-info">
                            <h1 className="movie-main-name heading heading-details heading-main color-orange">
                                Monty h2ython and the Holy Grail (2019)
                            </h1>
                            <h2 className="heading heading-details">
                                Wed Mar 23 2019
                            </h2>
                            <h2 className="heading heading-details">
                                Overview,
                            </h2>
                            <p className="synopsis">
                                Lorem Ih2sum is simh2ly dummy text of the
                                h2rinting and tyh2esetting industry. Lorem
                                Ih2sum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                h2rinter took a galley of tyh2e and scrambled it
                                to make a tyh2e sh2ecimen book. It has survived
                                not only five centuries, but also the leah2 into
                                electronic tyh2esetting, remaining essentially
                                unchanged. It was h2oh2ularised in the 1960s
                                with the release of Letraset sheets containing
                                Lorem Ih2sum h2assages, and more recently with
                                desktoh2 h2ublishing software like Aldus
                                h2ageMaker including versions of Lorem Ih2sum.
                            </p>
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
                            Directed By, Steven Spielberg
                        </h2>
                        <h2 className="heading">
                            Screenplay By, Steven Spielberg
                        </h2>
                        <div className="cast">
                            <MovieSlider>
                                {arr.map((val, index) => {
                                    return (
                                        <Link
                                            to={"../movie/" + index}
                                            key={index}
                                            className="card"
                                        >
                                            <div className="card card-r">
                                                <div>
                                                    <img
                                                        className="image"
                                                        src={levi}
                                                        alt="cast"
                                                    />
                                                </div>
                                                <div className="infoo">
                                                    <h5>Shazam</h5>
                                                    <h5>Zachary Levi</h5>
                                                </div>
                                            </div>
                                        </Link>
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
                                    src="https://www.youtube-nocookie.com/embed/aFtgADlZbVc"
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
                                    <div className="genre__tag">Adult</div>
                                </div>
                            </div>
                            <div className="genres">
                                <h3 className="heading">Genres</h3>
                                <div className="tags">
                                    <div className="genre__tag">Action</div>
                                    <div className="genre__tag">Adventure</div>
                                    <div className="genre__tag">Comedy</div>
                                </div>
                            </div>
                            <div className="country">
                                <h3 className="heading">Country</h3>
                                <div className="tags">
                                    <div className="genre__tag">
                                        United States of America
                                    </div>
                                </div>
                            </div>
                            <div className="language">
                                <h3 className="heading">Langauge</h3>
                                <div className="tags">
                                    <div className="genre__tag">English</div>
                                </div>
                            </div>
                            <div className="production">
                                <h3 className="heading">
                                    Production Companies
                                </h3>
                                <div className="tags">
                                    <div className="genre__tag">DC</div>
                                    <div className="genre__tag">
                                        Warner Bros
                                    </div>
                                    <div className="genre__tag">DC Comics</div>
                                </div>
                            </div>
                            <div className="runtime">
                                <h3 className="heading">Runtime</h3>
                                <div className="tags">
                                    <div className="genre__tag">
                                        120 minutes
                                    </div>
                                </div>
                            </div>
                            <div className="budget">
                                <h3 className="heading">Budget</h3>
                                <div className="tags">
                                    <div className="genre__tag">1000000$</div>
                                </div>
                            </div>
                            <div className="box-office">
                                <h3 className="heading">Box-Office</h3>
                                <div className="tags">
                                    <div className="genre__tag">10000000$</div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>

            <section className="recommendations home-width">
                <div className="recommend-heading-wrapper">
                    <h1 className="heading recommend-heading color-orange">
                        Recommendations
                    </h1>
                </div>
                <MovieSlider>
                    {arr2.map((val, index) => {
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
        </>
    );
};

export default MovieInfo;
