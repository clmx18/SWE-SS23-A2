import axios, { AxiosResponse } from 'axios';
import { BuchQueryField, FilterParam, BuchInput } from './interfaces';
import { buildQuery } from './queryBuilder';

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
        },
        data: {
            query,
        },
    };

    return axios.request(options);
};

export const createBuch = async (buchData: BuchInput): Promise<AxiosResponse> => {
    const mutation = `mutation {
      createBuch(input: ${JSON.stringify(buchData)}) {
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
      },
      data: {
        query: mutation,
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
