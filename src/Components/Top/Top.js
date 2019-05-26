import React from "react";
import {Link} from "@reach/router";

const Top = props => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/movie">Movie</Link>
        </div>
    );
};

export default Top;
