import React from "react";
import {navigate} from "@reach/router";
import posed from "react-pose";
import {Helmet} from "react-helmet";
import Img from "react-image";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import celeb154 from "./../../celeb-154.png";
import addToFav from "../Fetch/addToFav";
import removeFav from "../Fetch/removeFav";
import "./search.css";
import "./../User/user.css";
import Notify from "../Notification/Notify";
import NotFound from "../NotFound/NotFound";
import debounce from "../Utils/Debounce";
const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: this.props.query,
            resultHead: [],
            resultSecHead: [],
            resultLastHead: [],
            resultImg: [],
            resultId: [],
            favs: JSON.parse(sessionStorage.getItem("favs")),
            loaded: false,
            addToWatchlistLoading: false,
            clickedId: "",
            notification: {
                show: false,
                message: ""
            },
            areResultsFound: true,
            page: 1,
            allData: {results: []},
            infiniteLoading: true
        };
    }

    componentDidMount() {
        const dataFromCache = JSON.parse(localStorage.getItem("cache"));
        if (dataFromCache !== null) {
            dataFromCache[this.state.query]
                ? this.fetchSearchResults(dataFromCache[this.state.query])
                : this.fetchSearchResults(null);
        }

        document.addEventListener(
            "scroll",
            debounce(this.loadMoreResults, 250),
            true
        );
    }

    fetchSearchResults = async isQueryInCache => {
        let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=74d9bb95f2c26a20a3f908c481d10af3&query=${this.state.query}&page=${this.state.page}`;
        let data;

        if (isQueryInCache !== null) {
            data = isQueryInCache;
        } else {
            const response = await fetch(urlSearch);
            data = await response.json();
        }

        if (data.total_results === 0) {
            return this.setState({areResultsFound: false});
        }

        this.setState(
            prevState => ({
                infiniteLoading: false,
                allData: {
                    ...data,
                    results: [...prevState.allData.results, ...data.results]
                }
            }),
            () => this.dataSetter()
        );
    };

    dataSetter = () => {
        let head = [];
        let secHead = [];
        let lastHead = [];
        let img = [];
        let id = [];

        this.state.allData.results.map(val => {
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
            } else if (
                val.media_type === "person" &&
                val.known_for.length > 0
            ) {
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
                this.notify("Removed from your watchlist!");
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
                this.notify("Added to your watchlist!");
                this.setState({
                    favs: JSON.parse(sessionStorage.getItem("favs")),
                    addToWatchlistLoading: false,
                    clickedId: ""
                });
            }
        }
    };

    notify = message => {
        this.setState({
            notification: {
                show: true,
                message: message
            }
        });
        setTimeout(() => {
            this.setState({
                notification: {
                    show: false,
                    message: ""
                }
            });
        }, 2000);
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

    loadMoreResults = () => {
        console.log(
            window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
        );
        this.setState({
            infiniteLoading: true
        });

        if (
            this.state.page <= this.state.allData.total_pages ||
            window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
        ) {
            this.setState(
                {
                    page: this.state.page + 1
                },
                () => this.fetchSearchResults(null)
            );
        }
    };

    // loadMoreResults = debounce(() => {
    //     this.setState({
    //         infiniteLoading: true
    //     });

    //     if (
    //         this.state.page <= this.state.allData.total_pages ||
    //         window.innerHeight + document.documentElement.scrollTop ===
    //             document.documentElement.offsetHeight
    //     ) {
    //         this.setState(
    //             {
    //                 page: this.state.page + 1
    //             },
    //             () => this.fetchSearchResults(null)
    //         );
    //     }
    // }, 250);

    render() {
        return (
            <Hom>
                {this.state.query && this.state.areResultsFound && (
                    <section className="search-results">
                        <Helmet>
                            <title>{`Search results for "${this.props.query}" | FLIXI`}</title>
                        </Helmet>
                        <h1 className="heading search-main-head result-heading home-heading color-orange">
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
                                                        // <span role="img" aria-label="love">
                                                        //     &#128155;
                                                        // </span>
                                                        <svg
                                                            className="watchlist"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                            width="40"
                                                            height="40"
                                                            fill="#f9a602"
                                                        >
                                                            <path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="watchlist"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                            width="40"
                                                            height="40"
                                                            fill="#fff"
                                                        >
                                                            <path d="M363 277h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z" />
                                                            <path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256c0-44.3 17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" />
                                                        </svg>
                                                    )}
                                                </span>
                                            )}
                                            <Img
                                                className="result-full-img"
                                                src={[
                                                    `https://image.tmdb.org/t/p/w154/${this.state.resultImg[index]}`,
                                                    celeb154
                                                ]}
                                                alt={val}
                                                loader={
                                                    <div
                                                        style={{
                                                            height: "231px",
                                                            width: "154px",
                                                            borderRadius: "10px"
                                                        }}
                                                        className="gradient"
                                                    ></div>
                                                }
                                                onError={e =>
                                                    (e.target.src = celeb154)
                                                }
                                            />
                                            <div className="result-full-info">
                                                <h3 className="heading color-orange card-after-result-head">
                                                    {val}
                                                </h3>
                                                <h3 className="heading card-after-result-head">
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
                                                <h3 className="heading card-after-result-head">
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
                        {this.state.infiniteLoading && (
                            <div className="spinner-load-more">
                                <div className="double-bounce1" />
                                <div className="double-bounce2" />
                            </div>
                        )}
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
                <Notify
                    notify={this.state.notification.show}
                    message={this.state.notification.message}
                />
                {this.state.query && !this.state.areResultsFound && (
                    <NotFound
                        message={`No search results found for ${this.state.query}`}
                    />
                )}
            </Hom>
        );
    }
}

export default Search;
