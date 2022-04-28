export const isInteger = (str) => {
    if (typeof str != 'string') {
        return false;
    }

    return !isNaN(parseInt(str, 10));
};
