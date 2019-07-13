import React, {useState} from "react";
import {navigate} from "@reach/router";
import tryRegister from "./../Fetch/register";
import "./../Login/login.css";

const Register = () => {
    const [info, changeInfo] = useState({
        name: "",
        username: "",
        password: "",
        passwordConfirm: ""
    });
    const [validateMessage, changeValidateMessage] = useState("");
    const [validated, changeValidated] = useState(false);

    const handleInputChange = e => {
        changeInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        let passwordMatch;
        let passwordLengthCorrect;
        let isEmpty;
        if (info.password !== info.passwordConfirm) {
            passwordMatch = false;
            changeValidateMessage("Passwords don't match");
            changeValidated(true);
        } else {
            passwordMatch = true;
        }

        if (info.password.length < 8) {
            passwordLengthCorrect = false;
            changeValidateMessage("Pasword should be atleast 8 characters.");
            changeValidated(true);
        } else {
            passwordLengthCorrect = true;
        }

        if (
            info.username.length === 0 ||
            info.name.length === 0 ||
            info.password.length === 0 ||
            info.passwordConfirm === 0
        ) {
            isEmpty = true;
            changeValidateMessage("All fields required. All should be filled!");
            changeValidated(true);
        } else {
            isEmpty = false;
        }

        if (passwordMatch && passwordLengthCorrect && !isEmpty) {
            const registerSuccessful = await tryRegister(
                info.name,
                info.username,
                info.password,
                info.file
            );

            console.log(registerSuccessful);

            if (registerSuccessful[0] === true) {
                navigate("/");
            } else {
                changeValidateMessage("Can't sign-up. Please try again later!");
                changeValidated(true);
            }

            if (registerSuccessful[0] === false) {
                registerSuccessful[1] === 1001
                    ? changeValidateMessage("User already exists!")
                    : changeValidateMessage("Check your information again!");
            }
        } else {
        }
    };

    const handleFileUpload = async e => {
        if (e.target.files.length > 1) {
            return changeValidateMessage("Only one image allowed!");
        }

        changeInfo({
            ...info,
            [e.target.name]: e.target.files[0]
        });
    };

    return (
        <>
            {localStorage.getItem("authToken") === null && (
                <section className="login-wrapper">
                    <div className="login-form">
                        <label>
                            <span className="label-name">Name:</span>
                            <br />
                            <input
                                className="input"
                                type="name"
                                name="name"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <span className="label-name">Username:</span>
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
                        <label>
                            <span className="label-name">Repeat password:</span>
                            <br />
                            <input
                                className="input"
                                type="password"
                                name="passwordConfirm"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <span className="label-name">
                                Upload profile image
                            </span>
                            <br />
                            <input
                                className="input"
                                type="file"
                                name="file"
                                onChange={e => handleFileUpload(e)}
                            />
                        </label>
                        <button
                            className="btn login-btn"
                            onClick={() => handleRegister()}
                        >
                            Login
                        </button>
                    </div>
                </section>
            )}
            {localStorage.getItem("authToken") !== null && (
                <h1>Already logged in!</h1>
            )}
            {validated && <h1>{validateMessage}</h1>}
        </>
    );
};

export default Register;
