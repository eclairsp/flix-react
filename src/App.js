import React from "react";
import {Router} from "@reach/router";
import Home from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import MovieHome from "./Components/MovieHome/MovieHome";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import "./app.css";

function App() {
    return (
        <div className="app">
            <Header />
            <Router>
                <Home path="/" />
                <Movie path="/movie">
                    <MovieHome path="/" />
                    <MovieInfo path=":movieId" />
                </Movie>
                <Search path="/search/:query" />
            </Router>
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
