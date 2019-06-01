import React, {useState, useEffect, useCallback} from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import MovieSlider from "./../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {placeholderImg} from "../../placeholder.jpg";
import "./home.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const Home = props => {
    const [movieData, changeMovieData] = useState([]);
    const [tvData, changeTvData] = useState([]);
    const [celebData, changeCelebData] = useState([]);
    const [cardWidth, changeWidth] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            let urlMovie =
                "https://api.themoviedb.org/3/movie/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";
            let urlTv =
                "https://api.themoviedb.org/3/tv/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";
            let urlCeleb =
                "https://api.themoviedb.org/3/person/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";

            fetch(urlMovie)
                .then(res => res.json())
                .then(data => {
                    delete data.page;
                    delete data.total_results;
                    delete data.total_pages;

                    changeMovieData(data.results);
                });

            fetch(urlTv)
                .then(res => res.json())
                .then(data => {
                    delete data.page;
                    delete data.total_results;
                    delete data.total_pages;

                    changeTvData(data.results);
                });

            fetch(urlCeleb)
                .then(res => res.json())
                .then(data => {
                    delete data.page;
                    delete data.total_results;
                    delete data.total_pages;

                    changeCelebData(data.results);
                });
        };

        fetchData();
    }, []);

    const cardRef = useCallback(node => {
        if (node !== null) {
            changeWidth(node.clientWidth);
        }
    }, []);

    return (
        <Hom>
            <section className="home">
                <h1 className="heading home-heading color-orange">Popular</h1>
                <h2 className="heading color-orange">
                    MOVIES{" "}
                    <Link to="../movie" className="heading-see-more">
                        <span className="heading-see-more">See more</span>
                    </Link>
                </h2>
                <section className="home-movie home-width">
                    <MovieSlider width={cardWidth}>
                        {movieData.map(val => {
                            return (
                                <Link
                                    to={"../movie/" + val.id}
                                    key={val.id}
                                    className="card"
                                    ref={cardRef}
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
                                            className="slider-image"
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
                    TV-SHOWS{" "}
                    <Link to="../movie" className="heading-see-more">
                        <span className="heading-see-more">See more</span>
                    </Link>
                </h2>
                <section className="home-tv home-width">
                    <MovieSlider width={cardWidth}>
                        {tvData.map(val => {
                            return (
                                <Link
                                    to={"../movie/" + val.id}
                                    key={val.id}
                                    className="card"
                                    ref={cardRef}
                                >
                                    <div>
                                        <LazyLoadImage
                                            src={
                                                val.backdrop_path === null
                                                    ? placeholderImg
                                                    : `https://image.tmdb.org/t/p/w300/${
                                                          val.backdrop_path
                                                      }`
                                            }
                                            alt="poster"
                                            className="slider-image"
                                            placeholderSrc={placeholderImg}
                                        />
                                        <div className="data">
                                            <h4 className="card-movie-name">
                                                {val.name}{" "}
                                            </h4>
                                            <h5 className="card-release-date">
                                                {new Date(
                                                    val.first_air_date
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
                    PEOPLE{" "}
                    <Link to="../movie" className="heading-see-more">
                        <span className="heading-see-more">See more</span>
                    </Link>
                </h2>
                <section className="home-tv home-width">
                    <MovieSlider width={cardWidth}>
                        {celebData.map(val => {
                            return (
                                <Link
                                    to={"../movie/" + val.id}
                                    key={val.id}
                                    className="card"
                                    ref={cardRef}
                                >
                                    <div>
                                        <LazyLoadImage
                                            src={
                                                val.profile_path === null
                                                    ? placeholderImg
                                                    : `https://image.tmdb.org/t/p/w154/${
                                                          val.profile_path
                                                      }`
                                            }
                                            alt="poster"
                                            className="slider-image"
                                            placeholderSrc={placeholderImg}
                                        />
                                        <div className="data">
                                            <h4 className="card-movie-name">
                                                {val.name}
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
        </Hom>
    );
};

export default Home;
