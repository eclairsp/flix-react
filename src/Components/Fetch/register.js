const tryRegister = async (name, username, password, file) => {
    var userData = JSON.stringify({
        name: name,
        username: username,
        password: password
    });

    try {
        let response = await fetch("https://prab-flix-api.herokuapp.com/user", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: userData
        });

        let data = await response.json();

        if (response.status === 201) {
            const tryDP = await DP(file, data.token);

            if (tryDP === true) {
                localStorage.setItem("authToken", data.token);
                return [true];
            } else {
                await deleteUser(data.token);
                return [false, 0, "Can't upload"];
            }
        }

        if (response.status === 400) {
            return [false, data.code, data.message];
        }
    } catch (error) {
        return [false, 33];
    }
};

const DP = async (file, token) => {
    const formData = new FormData();
    console.log(file);

    formData.append("avatar", file);

    let response = await fetch(
        "https://prab-flix-api.herokuapp.com/user/me/avatar",
        {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }
    );

    if (response.status === 200) {
        return true;
    }

    if (response.status !== 200) {
        return false;
    }
};

const deleteUser = async token => {
    let response = await fetch(
        "https://prab-flix-api.herokuapp.com/user/delete",
        {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.status === 200) {
        return true;
    }

    if (response.status !== 200) {
        return false;
    }
};

export default tryRegister;
