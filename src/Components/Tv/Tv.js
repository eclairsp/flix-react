import React from "react";
import posed from "react-pose";

const Mov = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const Tv = props => {
    return <Mov>{props.children}</Mov>;
};

export default Tv;
