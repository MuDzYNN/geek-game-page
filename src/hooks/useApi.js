const Api = () => {
    return (url, options) => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/v1/${url}`, {
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
                .catch(error => reject(error));
        });
    }
};

export default Api;
