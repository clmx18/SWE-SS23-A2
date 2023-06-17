import {
    BuchInput,
    BuchQueryField,
    FilterParam,
    LoginResult,
} from './interfaces';
import axios, { AxiosResponse } from 'axios';
import Cookie from './cookie';
import { buildQuery } from './queryBuilder';

const cookie = new Cookie();

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
            ...(cookie.checkAuthCookie() && {
                Authorization: `Bearer ${cookie.getAuthCookie().token}`,
            }),
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

    const options = {
        method: 'POST',
        url: '/api',
        headers: {
            'Content-Type': 'application/json',
            'X-REQUEST-TYPE': 'GraphQL',
            ...(cookie.checkAuthCookie() && {
                Authorization: `Bearer ${cookie.getAuthCookie().token}`,
            }),
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
            ...(cookie.checkAuthCookie() && {
                Authorization: `Bearer ${cookie.getAuthCookie().token}`,
            }),
        },
        data: {
            query: mutation,
            variables: {
                buchData,
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
        loggedIn: false,
        errors: [],
    };

    await axios
        .request(options)
        .then((result) => {
            const { errors, data } = result.data;
            const { login } = data;
            if (login) {
                const { token } = login;
                const loggedIn = cookie.setAuthCookie(token);
                if (!loggedIn) {
                    throw new Error('Login fehlgeschlagen');
                }
                loginResult.loggedIn = loggedIn;
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

export const logout = async () => {
    cookie.removeAuthCookie();
};
