import React, {lazy, Suspense, useEffect, useState} from "react";
import {Router, Location} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import Home from "./Components/Home/Home";
// import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
// import MovieHome from "./Components/MovieHome/MovieHome";
import Header from "./Components/Header/Header";
// import Search from "./Components/Search/Search";
import LoadingAnimation from "./Components/LoadingAnimation/LoadingAnimation";
import "./App.css";

import getFavs from "./Components/Fetch/getFavs";

// const Header = true && import('./Components/Header/Header')
const Movie = lazy(() => import("./Components/Movie/Movie"));
const MovieHome = lazy(() => import("./Components/MovieHome/MovieHome"));
const Search = lazy(() => import("./Components/Search/Search"));
const Tv = lazy(() => import("./Components/Tv/Tv"));
const TvInfo = lazy(() => import("./Components/TvInfo/TvInfo"));
const SeasonInfo = lazy(() => import("./Components/SeasonInfo/SeasonInfo"));
const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const User = lazy(() => import("./Components/User/User"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));

const RoutesContainer = posed.div({
    enter: {y: 0, opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const App = () => {
    const [dialogues] = useState([
        "May the Force be with you.",
        "You talking to me?",
        "I see dead people.",
        "Here's Johnny!",
        "Hasta la vista, baby.",
        "I'm the king of the world!",
        "My precious.",
        "Why so serious?",
        "Elementary, my dear Watson.",
        "Where we're going, we don't need roads"
    ]);

    useEffect(() => {
        localStorage.getItem("authToken") && getFavs();
    });
    return (
        <div className="app">
            <Header />
            <Suspense
                fallback={
                    <LoadingAnimation animation={true} message="LOADING..." />
                }
            >
                <Location>
                    {({location}) => (
                        <PoseGroup className="main-outer">
                            <RoutesContainer key={location.key}>
                                <Router primary={false}>
                                    <NotFound
                                        default
                                        message="Sorry, nothing here!"
                                    />
                                    <Home path="/" />
                                    <Login path="/login" />
                                    <Register path="/register" />
                                    <Movie path="/movie">
                                        <MovieHome path="/" />
                                        <MovieInfo path=":movieId" />
                                    </Movie>
                                    <Tv path="/tv">
                                        {/* <TvHome path="/" /> */}
                                        <TvInfo path=":tvId" />
                                        <SeasonInfo path="/season/:tvId/:name/:seasons" />
                                    </Tv>
                                    <Search path="/search" />
                                    <Search path="/search/:query" />
                                    <User path="/user/:username" />
                                </Router>
                            </RoutesContainer>
                        </PoseGroup>
                    )}
                </Location>
            </Suspense>
            <footer>
                {`${dialogues[Math.floor(Math.random() * 10)]}`}
                <a
                    href="https://www.themoviedb.org"
                    className="tmdb-attribution"
                >
                    <svg
                        id="prefix__Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 407.34 160.81"
                        width="150"
                        height="75"
                    >
                        <defs>
                            <style>{".prefix__cls-1{fill:#01d277}"}</style>
                        </defs>
                        <title>{"PoweredByRectangle_Blue"}</title>
                        <path
                            className="prefix__cls-1"
                            d="M50.38 102.47h6.94V74.71h8.64v-6.89H41.74v6.89h8.64v27.76zM88.53 102.47h6.94v-34.7h-6.94v13.88H78.14V67.77H71.2v34.7h6.94V88.59h10.39v13.88zM121.25 95.53h-13.02v-6.94h11.12v-6.94h-11.12v-6.94h12.43v-6.94h-19.38v34.7h19.97v-6.94zM157.79 82.54L144.1 67.3h-2.23v35.24h7.03V83.17l8.89 9.32 8.88-9.32-.05 19.37h7.04V67.3h-2.19l-13.68 15.24z"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M3309.1 1841.93c-23.88 0-23.88 35.77 0 35.77s23.9-35.77 0-35.77zm0 28.59c-13.88 0-13.88-21.45 0-21.45s13.9 21.45 0 21.45z"
                            transform="translate(-3111.93 -1774.68)"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M254.5 67.83h6.94v34.7h-6.94zM274.19 95.6v-6.94h11.13v-6.94h-11.13v-6.94h12.44v-6.95h-19.38v34.71h19.96V95.6h-13.02z"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M3429.48 1842.91h-10.34v34.7h10.34c23.1 0 23.1-34.7 0-34.7zm0 27.76h-3.4v-20.82h3.4c13.52 0 13.52 20.82 0 20.82z"
                            transform="translate(-3111.93 -1774.68)"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M3472.7 1860.23c2.18-1.5 3.11-4.22 3.2-6.84.15-6.12-3.69-10.53-9.85-10.53h-13.74v34.75H3466a10.32 10.32 0 0010.24-10.44 8.43 8.43 0 00-3.54-6.94zm-13.4-10.44h6.17a3.51 3.51 0 010 7h-6.17v-7zm6.17 20.87h-6.17v-6.94h6.17a3.41 3.41 0 013.49 3.45 3.45 3.45 0 01-3.49 3.5z"
                            transform="translate(-3111.93 -1774.68)"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M233.13 86.57L224 67.83h-8.01l16.37 35.44h1.55l16.37-35.44h-8.01l-9.14 18.74z"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M3494.78 1920.93c14.6 0 24.48-9.88 24.48-24.48v-97.28c0-14.6-9.88-24.48-24.48-24.48h-358.37c-14.6 0-24.48 9.88-24.48 24.48v136.33l12.56-14.56v-121.77a11.94 11.94 0 0111.92-11.92h358.37a11.94 11.94 0 0111.92 11.92v97.28a11.94 11.94 0 01-11.92 11.92H3155l-12.56 12.56-.08-.1z"
                            transform="translate(-3111.93 -1774.68)"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M3154.3 1827.53v-15h5.9c5.84 0 5.82 9.26 0 9.26h-2.9v5.73h-3zm5.65-8.65c2 0 2-3.36 0-3.36h-2.65v3.36h2.65zM3176.07 1812.27c10.33 0 10.33 15.47 0 15.47s-10.33-15.47 0-15.47zm0 3.09c-6 0-6 9.28 0 9.28s6.01-9.29 0-9.29zM3193.12 1827.85l-6.15-15.33h3.38l3 7.66 2.94-7.52h.15l2.94 7.52 3-7.66h3.38l-6.13 15.26h-.55l-2.75-6.66-2.73 6.72h-.52zM3209.53 1827.53v-15h7.47v3h-4.51v3h3.95v3h-3.95v3h4.77v3h-7.77zM3229.47 1827.53l-3-5.73H3225v5.73h-3v-15h5.92c5.35 0 5.88 7.54 1.47 8.82l3.49 6.19h-3.4zm-4.47-8.65h2.65c2 0 2-3.36 0-3.36H3225v3.36zM3236.76 1827.53v-15h7.52v3h-4.51v3h3.95v3h-3.95v3h4.77v3h-7.77zM3253.71 1827.53h-4.47v-15h4.47c9.99-.01 9.99 15 0 15zm-1.47-12v9h1.47c5.84 0 5.84-9 0-9h-1.47zM3291.89 1820.77l-5.23-8.25h3.65l3.07 5.17 3.07-5.17h3.67l-5.25 8.25v6.76h-3v-6.76zM3282.58 1820.18a3.68 3.68 0 001.39-3 4.13 4.13 0 00-4.26-4.56h-5.94v15h5.94a4.46 4.46 0 004.43-4.51 3.65 3.65 0 00-1.56-2.93zm-5.79-4.51h2.67a1.52 1.52 0 010 3h-2.67v-3zm2.67 9h-2.67v-3h2.67a1.47 1.47 0 011.51 1.49 1.49 1.49 0 01-1.52 1.54z"
                            transform="translate(-3111.93 -1774.68)"
                        />
                    </svg>
                </a>
            </footer>
        </div>
    );
};

export default App;
