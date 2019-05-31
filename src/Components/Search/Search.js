import React from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import john from "./../../john-300.jpg";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "./search.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const Search = props => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <Hom>
            <section className="search-results">
                <h1 className="heading result-heading home-heading color-orange">
                    Search results for {props.query}
                </h1>
                <div className="results-search-wrapper">
                    <div className="results-search">
                        {arr.map((val, index) => {
                            return (
                                <Link
                                    to={"./../../movie/" + index}
                                    key={index}
                                    className="card card-res"
                                >
                                    <div>
                                        <LazyLoadImage
                                            alt="poster"
                                            effect="blur"
                                            src={john}
                                        />
                                        <div className="data">
                                            <h3 className="card-movie-name">
                                                John wick {val}
                                            </h3>
                                            <h4 className="card-release-date">
                                                24 May, 2019
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Hom>
    );
};

export default Search;
