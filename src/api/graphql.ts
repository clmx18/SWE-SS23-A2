import {
    BuchInput,
    BuchQueryField,
    FilterParam,
    LoginResult,
} from './interfaces';
import axios, { AxiosResponse } from 'axios';
import { buildQuery } from './queryBuilder';

// TODO Nur zum testen. Token nicht in Variable speichern!!
let accessToken: string;

export const queryBuecher = async (
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
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        data: {
            query,
        },
    };

    return axios.request(options);
};

export const queryBuch = async (id: string): Promise<AxiosResponse> => {
    const query = `{
        buch (id: "${id}") {
          id
          version
          isbn
          rating
          art
          preis
          rabatt
          lieferbar
          datum
          homepage
          schlagwoerter
          titel {
            titel
          }
        }
    }`;

    console.log(accessToken);

    const options = {
        method: 'POST',
        url: '/api',
        headers: {
            'Content-Type': 'application/json',
            'X-REQUEST-TYPE': 'GraphQL',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        data: {
            query,
        },
    };

    return axios.request(options);
};

export const createBuch = async (buchData: BuchInput) => {
    const mutation = `
    mutation create($buchData: BuchInput!) {
      create(input: $buchData)
    }
  `;

    const options = {
        method: 'POST',
        url: '/api',
        headers: {
            'Content-Type': 'application/json',
            'X-REQUEST-TYPE': 'GraphQL',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        data: {
            query: mutation,
            variables: {
                buchData: buchData,
            },
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

    const loginResult: LoginResult = {
        gotToken: false,
        errors: [],
    };

    await axios
        .request(options)
        .then((result) => {
            const { errors, data } = result.data;
            const { login } = data;
            if (login) {
                const { token } = login;
                // TODO Tokenspeicherort ersetzen
                accessToken = token;
                loginResult.gotToken = true;
            }
            if (errors) {
                const errMessage = errors
                    .flatMap((err: { message: string }) => err.message)
                    .toString();
                loginResult.errors?.push(errMessage);
            }
        })
        .catch((err) => loginResult.errors?.push(err.message));

    return loginResult;
};
