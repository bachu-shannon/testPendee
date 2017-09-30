export const setLocationData = (dataName, data) => {
    localStorage.setItem(dataName, JSON.stringify(data || {}));
};

export const getLocationData = data => {
    return JSON.parse(localStorage.getItem(data)) || {};
};