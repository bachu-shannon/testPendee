export const setData = (dataName, data) => {
    localStorage.setItem(dataName, JSON.stringify(data || {}));
};

export const getData = data => {
    return JSON.parse(localStorage.getItem(data)) || {};
};