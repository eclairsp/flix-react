import React, {useState, useRef, useEffect} from "react";
import "./movie-slider.css";

const MovieSlider = props => {
    const sliderContainerRef = useRef();

    const [sliderContainerWidth, changeSliderContainerWidth] = useState(0);
    const [scrollPosition, changeScrollPosition] = useState(0);
    const [cardWidth, getCardWidth] = useState(0);

    useEffect(() => {
        // Scroll to the new position based on changes in scrollToNExt and scrollToPrev functions.
        sliderContainerRef.current.scrollLeft = scrollPosition;
        getCardWidth(props.width);

        changeSliderContainerWidth(sliderContainerRef.current.offsetWidth);
    }, [
        props.card,
        props.cardWidth,
        props.width,
        scrollPosition,
        sliderContainerWidth
    ]);

    function scrollBy() {
        let totalCards = Math.floor(sliderContainerWidth / cardWidth);
        let scrollBy = null;
        if (totalCards === 1) {
            scrollBy = cardWidth;
        } else if (totalCards > 5) {
            scrollBy = cardWidth * 3;
        } else if (totalCards < 5) {
            scrollBy = cardWidth * 2;
        }

        return scrollBy;
    }

    function scrollToNext() {
        changeScrollPosition(
            sliderContainerRef.current.scrollLeft + scrollBy()
        );
        console.log(scrollPosition);
    }

    function scrollToPrev() {
        changeScrollPosition(
            sliderContainerRef.current.scrollLeft - scrollBy()
        );
        console.log(scrollPosition);
    }

    return (
        <section className="slider-container-wrappper">
            <button onClick={scrollToPrev} className="direction-arrow prev">
                <span className="arrow arrow-left" />
            </button>
            <button onClick={scrollToNext} className="direction-arrow next">
                <span className="arrow arrow-right" />
            </button>
            <div className="slider-container" ref={sliderContainerRef}>
                {props.children}
                {/* Dummy used to leave a 50px gap at the end */}
                <div className="dummy">This is dummyy</div>
            </div>
        </section>
    );
};

export default MovieSlider;
