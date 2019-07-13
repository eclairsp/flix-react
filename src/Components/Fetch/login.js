const tryLogin = async (username, password) => {
    var userData = JSON.stringify({
        username: username,
        password: password
    });

    try {
        let response = await fetch("http://localhost:3001/user/login", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: userData
        });

        let data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("authToken", data.token);
            return true;
        }

        if (response.status === 400) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default tryLogin;
