import React from "react";
import {navigate} from "@reach/router";
import posed from "react-pose";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import celeb154 from "./../../celeb-154.png";
import "./search.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

class Search extends React.Component {
    state = {
        query: this.props.query,
        resultHead: [],
        resultSecHead: [],
        resultLastHead: [],
        resultImg: [],
        resultId: [],
        loaded: false
    };

    componentDidMount() {
        this.fetchSearchResults();
    }

    fetchSearchResults = () => {
        let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=74d9bb95f2c26a20a3f908c481d10af3&query=${
            this.state.query
        }&sort_by=popularity.asc`;

        fetch(urlSearch)
            .then(res => res.json())
            .then(data => {
                let head = [];
                let secHead = [];
                let lastHead = [];
                let img = [];
                let id = [];
                data.results.map(val => {
                    if (val.media_type === "movie") {
                        head.push(val.title);
                        secHead.push(val.release_date);
                        lastHead.push("movie");
                        img.push(val.poster_path);
                        id.push(val.id);
                    } else if (val.media_type === "tv") {
                        head.push(val.name);
                        secHead.push(val.first_air_date);
                        lastHead.push("TV");
                        img.push(val.poster_path);
                        id.push(val.id);
                    } else if (val.media_type === "person") {
                        head.push(val.name);
                        secHead.push("known for, " + val.known_for[0].title);
                        lastHead.push("celeb");
                        img.push(val.profile_path);
                        id.push(val.id);
                    }
                    return null;
                });

                this.setState({
                    resultHead: head,
                    resultSecHead: secHead,
                    resultLastHead: lastHead,
                    resultImg: img,
                    resultId: id,
                    loaded: true
                });
            });
    };

    handleCardClick = index => {
        if (this.state.resultLastHead[index] === "movie") {
            navigate(`./../movie/${this.state.resultId[index]}`);
        } else if (this.state.resultLastHead[index] === "TV") {
            navigate(`./../tv/${this.state.resultId[index]}`);
        }
    };

    render() {
        return (
            <Hom>
                {this.state.query && (
                    <section className="search-results">
                        <h1 className="heading result-heading home-heading color-orange">
                            {`Search results for ${this.props.query}`}
                        </h1>
                        <div className="results-search-wrapper">
                            <div className="results-search">
                                {this.state.resultHead.map((val, index) => {
                                    return (
                                        <div
                                            className="card-after-result"
                                            onClick={() =>
                                                this.handleCardClick(index)
                                            }
                                            key={this.state.resultId[index]}
                                        >
                                            <LazyLoadImage
                                                className="result-full-img"
                                                src={
                                                    this.state.resultImg[
                                                        index
                                                    ] === null
                                                        ? celeb154
                                                        : `https://image.tmdb.org/t/p/w154/${
                                                              this.state
                                                                  .resultImg[
                                                                  index
                                                              ]
                                                          }`
                                                }
                                                alt={val}
                                                placeholderSrc={celeb154}
                                                effect="blur"
                                                onError={e =>
                                                    (e.target.src = celeb154)
                                                }
                                            />
                                            <div className="result-full-info">
                                                <h3 className="heading color-orange card-after-result-head">
                                                    {val}
                                                </h3>
                                                <h3 className="heading">
                                                    {this.state.resultSecHead[
                                                        index
                                                    ].includes("known for,")
                                                        ? this.state
                                                              .resultSecHead[
                                                              index
                                                          ]
                                                        : new Date(
                                                              this.state.resultSecHead[
                                                                  index
                                                              ]
                                                          ).toDateString()}
                                                </h3>
                                                <h3 className="heading">
                                                    {
                                                        this.state
                                                            .resultLastHead[
                                                            index
                                                        ]
                                                    }
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
                {!this.state.query && (
                    <LoadingAnimation
                        message="Search any movie, tv, and celeb"
                        animation={false}
                    />
                )}
            </Hom>
        );
    }
}

export default Search;
