export interface FilterParam {
    key: string;
    value: string;
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
        untertitel?: String;
    };
}