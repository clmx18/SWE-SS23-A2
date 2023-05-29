import axios, { AxiosResponse } from 'axios';
import { BuchQueryField, FilterParam } from './interfaces';
import { buildQuery } from './queryBuilder';

export const queryBuch = async (
    queryFields?: BuchQueryField[],
    queryFilter?: FilterParam[],
): Promise<AxiosResponse> => {
    const query = buildQuery(queryFields, queryFilter);

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

    return axios.request(options);
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
