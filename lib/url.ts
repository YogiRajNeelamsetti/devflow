import qs from 'query-string';

interface FormURLQueryProps {
    params: string;
    key: string;
    value: string;
}

interface RemoveKeysFromQueryProps {
    params: string;
    keysToRemove: string[];
}

export const formURLQuery = ({ params, key, value }: FormURLQueryProps) => {
    const queryString = qs.parse(params);

    queryString[key] = value;

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    }, { skipNull: true });
}

export const removeKeysFromQuery = ({ params, keysToRemove}: RemoveKeysFromQueryProps) => {
    const queryString = qs.parse(params);

    keysToRemove.forEach((key) => {
        delete queryString[key];
    });

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    }, { skipNull: true });
}