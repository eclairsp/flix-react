import React, {useState} from "react";
import tryLogin from "./../Fetch/login";
import "./login.css";

const Login = () => {
    const [info, changeInfo] = useState({});
    const [isLoginSuccessfull, changeLoginSuccessfull] = useState(false);

    const handleInputChange = e => {
        changeInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const loginSuccessfull = await tryLogin(
                info.username,
                info.password
            );

            if (loginSuccessfull) {
                changeLoginSuccessfull(false);
                window.location.href = "http://localhost:3000";
            } else {
                changeLoginSuccessfull(true);
            }
        } catch (error) {
            changeLoginSuccessfull(true);
        }
    };

    return (
        <>
            {localStorage.getItem("authToken") === null && (
                <section className="login-wrapper">
                    <div className="login-form">
                        <label>
                            <span className="label-name">Email:</span>
                            <br />
                            <input
                                className="input"
                                type="username"
                                name="username"
                                onChange={handleInputChange}
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
                            />
                        </label>
                        <button
                            className="btn login-btn"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                    </div>
                </section>
            )}
            {localStorage.getItem("authToken") !== null && (
                <h1>Already logged in!</h1>
            )}
            {isLoginSuccessfull && (
                <div className="error login-error">
                    Can't login at the moment. Try again later!
                </div>
            )}
        </>
    );
};

export default Login;
