import React from "react";
import posed, {PoseGroup} from "react-pose";
import "./notify.css";

const Notification = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: {type: "spring", stiffness: 1000, damping: 15},
            default: {duration: 300}
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {duration: 150}
    }
});

const Notify = ({notify, message}) => {
    return (
        <PoseGroup>
            {notify && (
                <Notification key="notify" className="notification">
                    {message}
                </Notification>
            )}
        </PoseGroup>
    );
};

export default Notify;
