const tryLogout = async () => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;

    try {
        const response = await fetch("https://prab-flix-api.herokuapp.com/user/logout", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                Authorization: auth
            }
        });

        if (response.status === 200) {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("favs");
            return true;
        }

        if (response.status !== 200) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default tryLogout;
