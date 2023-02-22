const Api = () => {
    return (url, options) => {
        return new Promise((resolve, reject) => {
            // console.log(`Request to ${process.env.REACT_APP_API_URL}/${url}`, options)
            fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: { "Content-type": "application/json;charset=UTF-8" },
                ...options
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) return reject(res.message);
                    resolve(res);
                })
                .catch(error => reject(error.toString()));
        });
    }
};

export default Api;
