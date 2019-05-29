import React, {Suspense, lazy} from "react";
import {Router} from "@reach/router";
import Home from "./Components/Home/Home";
// import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
// import MovieHome from "./Components/MovieHome/MovieHome";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import "./App.css";

// const Header = true && import('./Components/Header/Header')
const Movie = lazy(() => import("./Components/Movie/Movie"));
const MovieHome = lazy(() => import("./Components/MovieHome/MovieHome"));

function App() {
    return (
        <div className="app">
            <Header />
            <Suspense fallback={<div className="load">Loading...</div>}>
                <Router>
                    <Home path="/" />
                    <Movie path="/movie">
                        <MovieHome path="/" />
                        <MovieInfo path=":movieId" />
                    </Movie>
                    <Search path="/search/:query" />
                </Router>
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
