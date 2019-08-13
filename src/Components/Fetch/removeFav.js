import getFavs from "./getFavs";

const RemoveFav = async (tmdbId, type) => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;
    let dataFav = JSON.stringify({
        tmdbID: tmdbId.toString(),
        type: type
    });

    try {
        const response = await fetch(
            "https://prab-flix-api.herokuapp.com/user/remove/fav",
            {
                method: "delete",
                headers: {
                    "Content-type": "application/json",
                    Authorization: auth
                },
                body: dataFav
            }
        );

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

export default RemoveFav;
