import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import MovieSlider from "./../MovieSlider/MovieSlider";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {placeholderImg} from "../../placeholder.jpg";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
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
    const [loaded, changeLoaded] = useState(false);

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

            changeLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <Hom>
            {loaded && (
                <section className="home">
                    <h1 className="heading home-heading color-orange">
                        Popular
                    </h1>
                    <h2 className="heading color-orange">
                        MOVIES{" "}
                        <Link to="../movie" className="heading-see-more">
                            <span className="heading-see-more">See more</span>
                        </Link>
                    </h2>
                    <section className="home-movie home-width">
                        <MovieSlider>
                            {movieData.map(val => {
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
                        TV-SHOWS{" "}
                        {/* <Link to="../tv" className="heading-see-more">
                            <span className="heading-see-more">See more</span>
                        </Link> */}
                    </h2>
                    <section className="home-tv home-width">
                        <MovieSlider>
                            {tvData.map(val => {
                                return (
                                    <Link
                                        to={"../tv/" + val.id}
                                        key={val.id}
                                        className="card"
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
                                                className="card-image"
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

                    <h2 className="heading color-orange">CELEB </h2>
                    <section className="home-tv home-width">
                        <MovieSlider>
                            {celebData.map(val => {
                                return (
                                    <Link
                                        to={"../movie/" + val.id}
                                        key={val.id}
                                        className="card"
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
                                                className="card-image"
                                                placeholderSrc={placeholderImg}
                                            />
                                            <div className="data">
                                                <h4 className="card-celeb-name">
                                                    {val.name}
                                                </h4>
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

export default Home;
