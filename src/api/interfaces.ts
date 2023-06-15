export interface FilterParam {
    key: string;
    value: string | boolean | number;
}

export enum BuchQueryField {
    'id',
    'version',
    'isbn',
    'rating',
    'art',
    'preis',
    'rabatt',
    'lieferbar',
    'datum',
    'homepage',
    'schlagwoerter',
    'titel',
}

export interface BuchInput {
    isbn: string;
    rating?: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum?: string;
    homepage?: string;
    schlagwoerter?: string[];
    titel?: {
        titel?: string;
    };
}

export interface Buch {
    id?: string;
    version?: number;
    isbn?: string;
    rating?: number;
    art?: string;
    preis?: number;
    rabatt?: number;
    lieferbar?: boolean;
    datum?: string;
    homepage?: string;
    schlagwoerter?: [string];
    titel?: {
        titel?: string;
        untertitel?: string;
    };
}

export interface LoginResult {
    gotToken: boolean;
    errors: string[];
    username?: string;
    expiresIn?: string;
    issuer?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface JwtTokenPayload {
    username: string;
    sub: number;
    type: string;
    jti: string;
    iat: number;
    exp: number;
    iss: string;
}
