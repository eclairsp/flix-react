const tryLogout = async () => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;

    try {
        const response = await fetch("http://localhost:3001/user/logout", {
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
