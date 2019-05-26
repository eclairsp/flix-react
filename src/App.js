import React from "react";
import {Router} from "@reach/router";
import Home from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import MovieHome from "./Components/MovieHome/MovieHome";
import Top from "./Components/Top/Top";
import "./app.css";

function App() {
    return (
        <div>
            <Top />
            <Router>
                <Home path="/" />
                <Movie path="/movie">
                    <MovieHome path="/" />
                    <MovieInfo path=":movieId" />
                </Movie>
            </Router>
        </div>
    );
}

export default App;
