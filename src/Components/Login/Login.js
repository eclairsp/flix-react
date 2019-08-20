import React, {useState} from "react";
import tryLogin from "./../Fetch/login";
import "./login.css";

const Login = () => {
    const [info, changeInfo] = useState({});
    const [isLoginSuccessfull, changeIsLoginSuccessfull] = useState(false);
    const [isLoggingIn, changeIsLoggingIn] = useState(false);
    const [validationMessage, changeValidationMessage] = useState("");

    const handleInputChange = e => {
        changeInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            changeIsLoggingIn(true);

            let areEmpty = false;

            if (
                Object.entries(info).length === 0 &&
                info.constructor === Object
            ) {
                changeValidationMessage("You can't leave the fields empty!");
                areEmpty = true;
                changeIsLoggingIn(false);
                throw new Error("Fields Empty");
            }

            if (!areEmpty) {
                const loginSuccessfull = await tryLogin(
                    info.username,
                    info.password
                );

                if (loginSuccessfull[0]) {
                    changeIsLoginSuccessfull(false);
                    changeIsLoggingIn(false);
                    window.location.href = `https://flixi.netlify.com/user/${
                        info.username
                    }`;
                } else {
                    loginSuccessfull[1] === 400
                        ? changeValidationMessage(
                              "Username or password incorrect!"
                          )
                        : changeValidationMessage(
                              "Uh Oh. Something went wrong. Try again or refresh the page!"
                          );
                    changeIsLoggingIn(false);
                    changeIsLoginSuccessfull(true);
                }
            }
        } catch (error) {
            error.message === "Fields Empty"
                ? changeValidationMessage("Can't leave fields empty!")
                : changeValidationMessage(
                      "Uh Oh. Something went wrong. Try again or refresh the page!"
                  );
            changeIsLoggingIn(false);
            changeIsLoginSuccessfull(true);
        }
    };

    const handleKeyboardPress = e => {
        let keyPressed = e.keyCode || e.which;

        if (keyPressed === 13) {
            handleLogin();
        }
    };

    return (
        <>
            {localStorage.getItem("authToken") === null && (
                <section className="login-wrapper">
                    <div className="login-form">
                        <label>
                            <span className="label-name">Username:</span>
                            <br />
                            <input
                                className="input"
                                type="username"
                                name="username"
                                onChange={handleInputChange}
                                onKeyDown={e => handleKeyboardPress(e)}
                            />
                        </label>
                        <label>
                            <span className="label-name">Password:</span>
                            <br />
                            <input
                                className="input"
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                                onKeyDown={e => handleKeyboardPress(e)}
                            />
                        </label>
                        <button
                            className="user-btn form-btn menu-item"
                            onClick={() => handleLogin()}
                        >
                            {isLoggingIn ? (
                                <div
                                    aria-label="Trying to log in."
                                    className="spinner-login-btn"
                                />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </section>
            )}
            {localStorage.getItem("authToken") !== null && (
                <h1 className="validation-message">Already logged in!</h1>
            )}
            {isLoginSuccessfull && (
                <div className="validation-message">{validationMessage}</div>
            )}
        </>
    );
};

export default Login;
