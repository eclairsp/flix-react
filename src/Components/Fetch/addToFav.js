import getFavs from "./getFavs";

const addToFav = async (tmdbId, type) => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;
    let dataFav = JSON.stringify({
        tmdbID: tmdbId,
        type: type
    });

    try {
        const response = await fetch("http://localhost:3001/user/fav", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                Authorization: auth
            },
            body: dataFav
        });

        if (response.status === 200) {
            await getFavs();
            return true;
        }

        if (response.status !== 200) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default addToFav;
