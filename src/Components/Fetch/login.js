import getFavs from "./getFavs";

const tryLogin = async (username, password) => {
    var userData = JSON.stringify({
        username: username,
        password: password
    });

    try {
        let response = await fetch(
            "https://prab-flix-api.herokuapp.com/user/login",
            {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: userData
            }
        );

        let data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("authToken", data.token);
            await getFavs();
            return [true, 200];
        }

        if (response.status === 400) {
            return [false, 400];
        }

        if (response.status !== 400 && response.status !== 200) {
            throw "Something went wrong!";
        }
    } catch (error) {
        return [false, 500];
    }
};

export default tryLogin;
