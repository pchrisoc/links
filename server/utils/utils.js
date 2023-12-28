/*
File to store utility functions

1. validateUrl() - checks if the url is valid

*/

const validateUrl = (url) => {
    const urlRegex = new RegExp(
        "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}" +
        "(:[0-9]{1,5})?(\/.*)?$",
        "i"
    );
    return urlRegex.test(url);
    }

export { validateUrl };
