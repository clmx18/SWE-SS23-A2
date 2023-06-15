import { BuchQueryField, FilterParam } from './interfaces';

export const buildQuery = (
    queryFields?: BuchQueryField[],
    queryFilter?: FilterParam[],
): string => {
    let fields = '';

    if (queryFields && queryFields.length > 0) {
        for (const field of queryFields) {
            switch (field) {
                case BuchQueryField.id:
                    fields += `
                        id
                    `;
                    break;
                case BuchQueryField.version:
                    fields += `
                        version
                    `;
                    break;
                case BuchQueryField.isbn:
                    fields += `
                        isbn
                    `;
                    break;
                case BuchQueryField.rating:
                    fields += `
                        rating
                    `;
                    break;
                case BuchQueryField.art:
                    fields += `
                        art
                    `;
                    break;
                case BuchQueryField.preis:
                    fields += `
                        preis
                    `;
                    break;
                case BuchQueryField.rabatt:
                    fields += `
                        rabatt
                    `;
                    break;
                case BuchQueryField.lieferbar:
                    fields += `
                        lieferbar
                    `;
                    break;
                case BuchQueryField.datum:
                    fields += `
                        datum
                    `;
                    break;
                case BuchQueryField.homepage:
                    fields += `
                        homepage
                    `;
                    break;
                case BuchQueryField.schlagwoerter:
                    fields += `
                        schlagwoerter
                    `;
                    break;
                case BuchQueryField.titel:
                    fields += `
                        titel {
                            titel
                            untertitel
                        }
                    `;
                    break;
                default:
                    break;
            }
        }
    } else {
        fields = `
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
                untertitel
            }
        `;
    }

    let filter = 'buecher';
    if (queryFilter && queryFilter.length > 0) {
        let p = '';
        for (const index of queryFilter.keys()) {
            const type = typeof queryFilter[index].value;

            switch (type) {
                case 'string':
                    p += `${queryFilter[index].key}: "${queryFilter[index].value}"`;
                    break;
                case 'boolean':
                case 'number':
                    p += `${queryFilter[index].key}: ${queryFilter[index].value}`;
                    break;
                default:
                    break;
            }

            if (index < queryFilter.length - 1 && queryFilter.length > 1) {
                p += ', ';
            }
        }
        filter = `buecher (${p})`;
    }

    return `{
        ${filter} {
            ${fields}
        }
    }`;
};
