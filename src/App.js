import React, {lazy, Suspense} from "react";
import {Router, Location} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import Home from "./Components/Home/Home";
// import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
// import MovieHome from "./Components/MovieHome/MovieHome";
import Header from "./Components/Header/Header";
// import Search from "./Components/Search/Search";
import "./App.css";

// const Header = true && import('./Components/Header/Header')
const Movie = lazy(() => import("./Components/Movie/Movie"));
const MovieHome = lazy(() => import("./Components/MovieHome/MovieHome"));
const Search = lazy(() => import("./Components/Search/Search"));

const RoutesContainer = posed.div({
    enter: {y: 0, opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

function App() {
    let loader = (
        <div class="loader">
            <div className="circle">LOADING ...</div>
        </div>
    );
    return (
        <div className="app">
            <Header />
            <Suspense fallback={loader}>
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
