const isUserPresent = async username => {
    try {
        const response = await fetch(
            `https://prab-flix-api.herokuapp.com/user/${username}`,
            {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                }
            }
        );

        if (response.status === 200) {
            return true;
        }

        if (response.status === 404) {
            return false;
        }

        if (response.status !== 200) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default isUserPresent;
