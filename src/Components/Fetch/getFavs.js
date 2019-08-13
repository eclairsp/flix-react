const getFavs = async () => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;

    try {
        const response = await fetch("https://prab-flix-api.herokuapp.com/user/get/fav", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                Authorization: auth
            }
        });

        const data = await response.json();

        if (response.status === 200) {
            sessionStorage.setItem("favs", JSON.stringify(data.favourites));
            return data;
        }

        if (response.status !== 200) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default getFavs;
