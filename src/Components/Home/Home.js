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
        transition: {duration: 200},
    },
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

        const fetchData = async (url, type) => {
            try {
                const response = await fetch(url);

                const data = await response.json();

                switch (type) {
                    case "movie":
                        changeMovieData(data.results);
                        break;
                    case "tv":
                        changeTvData(data.results);
                        break;
                    case "celeb":
                        changeCelebData(data.results);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchData(urlMovie, "movie");
        fetchData(urlTv, "tv");
        fetchData(urlCeleb, "celeb");
        changeLoaded(true);
    }, []);

    return (
        <Hom>
            <Helmet>
                <title>FLIXI | Home</title>
                <meta
                    name="description"
                    content="Get info about your favourite movies, TV-shows and celebs"
                />
                <link rel="canonical" href="https://flixi.netlify.app/" />
                <meta name="Description" content="Flixi" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:url" content="https://flixi.netlify.app/" />
                <meta property="og:title" content="Flixi" />
                <meta
                    property="og:description"
                    content="Flixi is a webapp to know about the lastest movies and make a list of ones you want to watch."
                />
                <meta
                    property="og:image"
                    content="https://flixi.netlify.app/android-chrome-512x512.png"
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
                            to="../"
                        />
                    )}

                    {tvData.length !== 0 && (
                        <HomeSlider
                            name="TV-SHOWS"
                            data={tvData}
                            type="tv"
                            showMore={false}
                            to="../"
                        />
                    )}

                    {celebData.length !== 0 && (
                        <HomeSlider
                            name="PEOPLE"
                            data={celebData}
                            showMore={false}
                            type="people"
                            to="../"
                            cast={false}
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
