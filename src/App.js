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
            <footer>{`${dialogues[Math.floor(Math.random() * 10)]}`}</footer>
        </div>
    );
};

export default App;
