import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import posed from "react-pose";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import HomeSlider from "../HomeSlider/HomeSlider";
import "./home.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const Home = () => {
    const [movieData, changeMovieData] = useState([]);
    const [tvData, changeTvData] = useState([]);
    const [celebData, changeCelebData] = useState([]);
    const [loaded, changeLoaded] = useState(false);

    useEffect(() => {
        let urlMovie =
            "https://api.themoviedb.org/3/movie/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";
        let urlTv =
            "https://api.themoviedb.org/3/tv/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";
        let urlCeleb =
            "https://api.themoviedb.org/3/person/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1";

        const fetchData = () => {
            fetch(urlMovie)
                .then(res => res.json())
                .then(data => {
                    changeMovieData(data.results);
                });

            fetch(urlTv)
                .then(res => res.json())
                .then(data => {
                    changeTvData(data.results);
                });

            fetch(urlCeleb)
                .then(res => res.json())
                .then(data => {
                    changeCelebData(data.results);
                });

            changeLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <Hom>
            <Helmet>
                <title>FLIX | Home</title>
                <meta
                    name="description"
                    content="Get info about your favourite movies, TV-shows and celebs"
                />
            </Helmet>
            {loaded && (
                <section className="home">
                    <h1 className="heading home-heading color-orange">
                        Popular
                    </h1>
                    {movieData.length !== 0 && (
                        <HomeSlider
                            name="MOVIES"
                            data={movieData}
                            type="movie"
                            showMore={true}
                        />
                    )}

                    {tvData.length !== 0 && (
                        <HomeSlider
                            name="TV-SHOWS"
                            data={tvData}
                            type="tv"
                            showMore={false}
                        />
                    )}

                    {celebData.length !== 0 && (
                        <HomeSlider
                            name="PEOPLE"
                            data={celebData}
                            showMore={false}
                        />
                    )}
                </section>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
        </Hom>
    );
};

export default Home;
