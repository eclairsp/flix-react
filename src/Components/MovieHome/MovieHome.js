import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import MovieSlider from "../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {placeholderImg} from "../../placeholder.jpg";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import "./movie-home.css";
import "./../Home/home.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const MovieHome = props => {
    const [topRated, changeTopRated] = useState([]);
    const [nowPlaying, changeNowPlaying] = useState([]);
    const [upcoming, changeUpcoming] = useState([]);
    const [countryCode, changeCountryCode] = useState(
        localStorage.getItem("userCountryCode")
    );
    const [country, changeCountry] = useState(
        localStorage.getItem("userCountry")
    );
    const [loaded, changeLoaded] = useState(true);

    useEffect(() => {
        if (
            localStorage.getItem("userCountry") === null ||
            localStorage.getItem("userCountryCode") === null
        ) {
            let urlCountry =
                "http://api.ipstack.com/check?access_key=902974efd3ea033ac779b36609781f62";
            fetch(urlCountry)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("userCountry", data.country_name);
                    localStorage.setItem("userCountryCode", data.country_code);
                    changeCountry(localStorage.getItem("userCountry"));
                    changeCountryCode(localStorage.getItem("userCountryCode"));
                });
        }

        const fetchData = () => {
            let urlTopRated =
                "https://api.themoviedb.org/3/movie/top_rated?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=11";
            let urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1&${
                countryCode === null ? "region=US" : `region=${countryCode}`
            }`;
            console.log(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1&${
                    countryCode === null ? "region=US" : `region=${countryCode}`
                }`
            );
            let urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1&${
                countryCode === null ? "region=US" : `region=${countryCode}`
            }`;

            fetch(urlTopRated)
                .then(res => res.json())
                .then(data => {
                    changeTopRated(data.results);
                });

            fetch(urlNowPlaying)
                .then(res => res.json())
                .then(data => {
                    console.log(data.results);
                    changeNowPlaying(data.results);
                });

            fetch(urlUpcoming)
                .then(res => res.json())
                .then(data => {
                    console.log(data.results);
                    changeUpcoming(data.results);
                });

            changeLoaded(true);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Hom>
            {loaded && (
                <section className="home">
                    <h1 className="heading home-heading color-orange">
                        MOVIES
                    </h1>
                    <h2 className="heading color-orange">
                        Playing now {country ? `in ${country}` : ""}
                    </h2>
                    <section className="home-movie home-width">
                        <MovieSlider>
                            {nowPlaying.map(val => {
                                return (
                                    <Link
                                        to={"../movie/" + val.id}
                                        key={val.id}
                                        className="card"
                                    >
                                        <div>
                                            <LazyLoadImage
                                                alt="poster"
                                                effect="blur"
                                                src={
                                                    val.backdrop_path === null
                                                        ? placeholderImg
                                                        : `https://image.tmdb.org/t/p/w300/${
                                                              val.backdrop_path
                                                          }`
                                                }
                                                className="card-image"
                                                placeholderSrc={placeholderImg}
                                            />
                                            <div className="data">
                                                <h4 className="card-movie-name">
                                                    {val.title}
                                                </h4>
                                                <h5 className="card-release-date">
                                                    {new Date(
                                                        val.release_date
                                                    ).toDateString()}
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </MovieSlider>
                    </section>

                    <h2 className="heading color-orange">
                        Upcoming {country ? `in ${country}` : ""}
                    </h2>
                    <section className="home-tv home-width">
                        <MovieSlider>
                            {upcoming.map(val => {
                                return (
                                    <Link
                                        to={"../movie/" + val.id}
                                        key={val.id}
                                        className="card"
                                    >
                                        <div>
                                            <LazyLoadImage
                                                alt="poster"
                                                effect="blur"
                                                src={
                                                    val.backdrop_path === null
                                                        ? placeholderImg
                                                        : `https://image.tmdb.org/t/p/w300/${
                                                              val.backdrop_path
                                                          }`
                                                }
                                                className="card-image"
                                                placeholderSrc={placeholderImg}
                                            />
                                            <div className="data">
                                                <h4 className="card-movie-name">
                                                    {val.title}
                                                </h4>
                                                <h5 className="card-release-date">
                                                    {new Date(
                                                        val.release_date
                                                    ).toDateString()}
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </MovieSlider>
                    </section>

                    <h2 className="heading color-orange">Top Rated</h2>
                    <section className="home-tv home-width">
                        <MovieSlider>
                            {topRated.map(val => {
                                return (
                                    <Link
                                        to={"../movie/" + val.id}
                                        key={val.id}
                                        className="card"
                                    >
                                        <div>
                                            <LazyLoadImage
                                                alt="poster"
                                                effect="blur"
                                                src={
                                                    val.backdrop_path === null
                                                        ? placeholderImg
                                                        : `https://image.tmdb.org/t/p/w300/${
                                                              val.backdrop_path
                                                          }`
                                                }
                                                className="card-image"
                                                placeholderSrc={placeholderImg}
                                            />
                                            <div className="data">
                                                <h4 className="card-movie-name">
                                                    {val.title}
                                                </h4>
                                                <h5 className="card-release-date">
                                                    {new Date(
                                                        val.release_date
                                                    ).toDateString()}
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </MovieSlider>
                    </section>
                </section>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
        </Hom>
    );
};

export default MovieHome;
