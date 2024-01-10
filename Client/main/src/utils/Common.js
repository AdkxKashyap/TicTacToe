export const isStringEmpty = (str) => {
    return str === null || str.trim().length === 0;
}

export const isNull = (item) => {
    return item === null || item === undefined;
}