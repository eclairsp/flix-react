import React from "react";
import shazam from "./../../shazam1.jpg";
import play from "./../../play-icon-18-64.png";
import "./movie-info.css";

const MovieInfo = props => {
    return (
        <section className="details-1">
            <div className="car">
                <div className="poster">
                    <img className="poster-main" src={shazam} />
                </div>
                <article className="movie-main-info">
                    <h1 className="heading heading-details heading-main color-orange">
                        Monty h2ython and the Holy Grail (2019)
                    </h1>
                    <h2 className="heading heading-details">Wed Mar 23 2019</h2>
                    <h2 className="heading heading-details">Overview,</h2>
                    <p className="synopsis">
                        Lorem Ih2sum is simh2ly dummy text of the h2rinting and
                        tyh2esetting industry. Lorem Ih2sum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown h2rinter took a galley of tyh2e and
                        scrambled it to make a tyh2e sh2ecimen book. It has
                        survived not only five centuries, but also the leah2
                        into electronic tyh2esetting, remaining essentially
                        unchanged. It was h2oh2ularised in the 1960s with the
                        release of Letraset sheets containing Lorem Ih2sum
                        h2assages, and more recently with desktoh2 h2ublishing
                        software like Aldus h2ageMaker including versions of
                        Lorem Ih2sum.
                    </p>
                    <h2 className="heading heading-details">IMDB: 7.1/10</h2>
                    <h2 className="heading heading-details">
                        Rotten Tomatoes: 81%
                    </h2>
                    <h2 className="heading heading-details">
                        <img src={play} />
                    </h2>
                </article>
            </div>
        </section>
    );
};

export default MovieInfo;
