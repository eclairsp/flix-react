import React from "react";
import {navigate} from "@reach/router";
import posed from "react-pose";
import {Helmet} from "react-helmet";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import celeb154 from "./../../celeb-154.png";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./search.css";
import "./../User/user.css";

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
        favs: JSON.parse(sessionStorage.getItem("favs")),
        loaded: false,
        addToWatchlistLoading: false,
        clickedId: ""
    };

    componentDidMount() {
        this.fetchSearchResults();
    }

    fetchSearchResults = async () => {
        let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=74d9bb95f2c26a20a3f908c481d10af3&query=${
            this.state.query
        }&sort_by=popularity.asc`;

        const response = await fetch(urlSearch);
        const data = await response.json();

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
                lastHead.push("tv");
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
    };

    handleCardClick = index => {
        if (this.state.resultLastHead[index] === "movie") {
            navigate(`./../movie/${this.state.resultId[index]}`);
        } else if (this.state.resultLastHead[index] === "tv") {
            navigate(`./../tv/${this.state.resultId[index]}`);
        }
    };

    Fav = async (e, index, isFav) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            this.setState({
                addToWatchlistLoading: true,
                clickedId: this.state.resultId[index].toString()
            });
            const isRemoved = await removeFav(
                this.state.resultId[index].toString(),
                this.state.resultLastHead[index]
            );
            if (isRemoved) {
                this.setState({
                    favs: JSON.parse(sessionStorage.getItem("favs")),
                    addToWatchlistLoading: false,
                    clickedId: ""
                });
            }
        } else {
            this.setState({
                addToWatchlistLoading: true,
                clickedId: this.state.resultId[index].toString()
            });
            const isAdded = await addToFav(
                this.state.resultId[index].toString(),
                this.state.resultLastHead[index]
            );
            if (isAdded) {
                this.setState({
                    favs: JSON.parse(sessionStorage.getItem("favs")),
                    addToWatchlistLoading: false,
                    clickedId: ""
                });
            }
        }
    };

    checkFav = index => {
        const id = this.state.resultId[index];
        let isFav = false;

        if (this.state.favs !== null) {
            this.state.favs.forEach(element => {
                if (
                    element.tmdbID === id.toString() &&
                    element.type === this.state.resultLastHead[index]
                ) {
                    isFav = true;
                }
            });
        }

        return isFav;
    };

    render() {
        return (
            <Hom>
                {this.state.query && (
                    <section className="search-results">
                        <Helmet>
                            <title>{`Search results for "${
                                this.props.query
                            }" | FLIX`}</title>
                        </Helmet>
                        <h1 className="heading result-heading home-heading color-orange">
                            {`Search results for "${this.props.query}"`}
                        </h1>
                        <div className="results-search-wrapper">
                            <div className="results-search">
                                {this.state.resultHead.map((val, index) => {
                                    const fav = this.checkFav(index);
                                    return (
                                        <div
                                            className="card-after-result"
                                            onClick={() =>
                                                this.handleCardClick(index)
                                            }
                                            key={this.state.resultId[index]}
                                        >
                                            {this.state.resultLastHead[
                                                index
                                            ] !== "celeb" && (
                                                <span
                                                    className="remove"
                                                    onClick={async e =>
                                                        this.Fav(e, index, fav)
                                                    }
                                                >
                                                    {this.state
                                                        .addToWatchlistLoading &&
                                                    this.state.resultId[
                                                        index
                                                    ].toString() ===
                                                        this.state.clickedId ? (
                                                        <div class="spinner-search">
                                                            <div class="double-bounce1" />
                                                            <div class="double-bounce2" />
                                                        </div>
                                                    ) : fav ? (
                                                        <span
                                                            role="img"
                                                            aria-label="love"
                                                        >
                                                            &#128155;
                                                        </span>
                                                    ) : (
                                                        <span
                                                            role="img"
                                                            aria-label="love"
                                                        >
                                                            &#128153;
                                                        </span>
                                                    )}
                                                </span>
                                            )}
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
                    <>
                        <Helmet>
                            <title>Search any movie, TV-show, and celeb</title>
                        </Helmet>

                        <LoadingAnimation
                            message="Search any movie, tv, and celeb"
                            animation={false}
                        />
                    </>
                )}
            </Hom>
        );
    }
}

export default Search;
