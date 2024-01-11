export const isStringEmpty = (str) => {
    return isNull(str) || str.trim().length === 0;
}

export const isNull = (item) => {
    return item === null || item === undefined;
}