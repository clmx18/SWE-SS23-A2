import axios from 'axios';

export const queryBuch = async (search?: [SearchParameter]) => {
    if (search && search.length > 0) {
    }

    //titel
    //id
    //ISBN
    //ART

    const query = `{
        buecher {
            id
            version
            art
            titel {
                titel
            }
        }
    }`;

    const options = {
        method: 'POST',
        url: '/api',
        headers: {
            'Content-Type': 'application/json',
            'X-REQUEST-TYPE': 'GraphQL',
        },
        data: {
            query: query,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            const res = response.data; // Response received from the API
            console.log(JSON.stringify(res));
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const login = async (username: string, password: string) => {
    const mutation = `
    mutation {
        login(username: "${username}", password: "${password}") {
          token
          expiresIn
          roles
        }
    }`;

    const options = {
        method: 'POST',
        url: '/api',
        headers: {
            'Content-Type': 'application/json',
            'X-REQUEST-TYPE': 'GraphQL',
        },
        data: {
            query: mutation,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            const res = response.data; // Response received from the API
            console.log(JSON.stringify(res));
        })
        .catch(function (error) {
            console.error(error);
        });
};
