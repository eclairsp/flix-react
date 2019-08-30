import React, {useState} from "react";
import tryRegister from "./../Fetch/register";
import "./../Login/login.css";

const Register = () => {
    const [info, changeInfo] = useState({
        name: "",
        username: "",
        password: "",
        passwordConfirm: ""
    });
    const [validateMessage, changeValidateMessage] = useState(
        "All fields required. All should be filled!"
    );
    const [validated, changeValidated] = useState(true);
    const [filename, changeFilename] = useState("Upload Profile Picture");
    const [isRegistering, changeIsRegistering] = useState(false);

    const handleInputChange = e => {
        changeValidated(false);
        changeInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        changeIsRegistering(true);

        let passwordMatch;
        let passwordLengthCorrect;
        let isEmpty;
        if (info.password !== info.passwordConfirm) {
            passwordMatch = false;
            changeIsRegistering(false);
            changeValidateMessage("Passwords don't match");
            changeValidated(true);
        } else {
            passwordMatch = true;
        }

        if (info.password.length < 8) {
            passwordLengthCorrect = false;
            changeIsRegistering(false);
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
            changeIsRegistering(false);
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

            if (registerSuccessful[0] === true) {
                changeIsRegistering(false);
                window.location.href = `https://flixi.netlify.com/user/${info.username}`;
            } else {
                changeIsRegistering(false);
                changeValidateMessage(
                    "Can't sign-up. Please try again later! Make sure the image is less tha 2MB"
                );
                changeValidated(true);
            }

            if (registerSuccessful[0] === false) {
                changeIsRegistering(false);
                registerSuccessful[1] === 1001
                    ? changeValidateMessage("User already exists!")
                    : changeValidateMessage("Check your information again!");
            }
        }
    };

    const handleFileUpload = async e => {
        if (e.target.files.length > 1) {
            return changeValidateMessage("Only one image allowed!");
        }

        changeFilename(e.target.files[0].name);

        changeInfo({
            ...info,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleKeyboardPress = e => {
        let keyPressed = e.keyCode || e.which || document.keyCode;

        if (keyPressed === 13) {
            handleRegister();
        }
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
                                onKeyDown={e => handleKeyboardPress(e)}
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
                            <div className="upload-btn-wrapper">
                                <button className="upload-btn">
                                    {filename}
                                </button>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={e => handleFileUpload(e)}
                                />
                            </div>
                        </label>
                        <button
                            className="user-btn menu-item form-btn"
                            onClick={() => handleRegister()}
                        >
                            {isRegistering ? (
                                <div
                                    aria-label="Trying to register."
                                    className="spinner-login-btn"
                                />
                            ) : (
                                "Register"
                            )}
                        </button>
                    </div>
                </section>
            )}
            {localStorage.getItem("authToken") !== null && (
                <h1 className="validation-message">Already logged in!</h1>
            )}
            {validated && (
                <h1 className="validation-message">{validateMessage}</h1>
            )}
        </>
    );
};

export default Register;
