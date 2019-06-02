import React, {lazy, Suspense} from "react";
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

// const Header = true && import('./Components/Header/Header')
const Movie = lazy(() => import("./Components/Movie/Movie"));
const MovieHome = lazy(() => import("./Components/MovieHome/MovieHome"));
const Search = lazy(() => import("./Components/Search/Search"));
const Tv = lazy(() => import("./Components/Tv/Tv"));
const TvInfo = lazy(() => import("./Components/TvInfo/TvInfo"));
const SeasonInfo = lazy(() => import("./Components/SeasonInfo/SeasonInfo"));

const RoutesContainer = posed.div({
    enter: {y: 0, opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

function App() {
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
                        <PoseGroup>
                            <RoutesContainer key={location.key}>
                                <Router primary={false}>
                                    <Home path="/" />
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
                                </Router>
                            </RoutesContainer>
                        </PoseGroup>
                    )}
                </Location>
            </Suspense>
            <footer>
                Made with{" "}
                <span role="img" aria-label="love">
                    &#128153;
                </span>{" "}
                by, Prab
            </footer>
        </div>
    );
}

export default App;
