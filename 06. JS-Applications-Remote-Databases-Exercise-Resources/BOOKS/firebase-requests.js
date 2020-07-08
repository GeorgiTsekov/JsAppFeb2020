export const apiKey = 'https://remotedatalast.firebaseio.com/' // add your firebase url here!

export const getAllBooks = () => {
    return fetch(apiKey + 'books.json')
        .then(res => res.json());
};

export const getBookById = (bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`)
        .then(res => res.json());
};

export const createNewBook = (bookBody) => {
    return fetch(apiKey + 'books.json', {
        method: 'POST',
        body: JSON.stringify(bookBody)
    }).then(res => res.json());
};

export const updateBook = (bookBody, bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`, {
        method: 'PUT',
        body: JSON.stringify(bookBody)
    }).then(res => res.json());
};

export const patchBook = (bookBody, bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`, {
        method: 'PATCH',
        body: JSON.stringify(bookBody)
    }).then(res => res.json());
};

export const deleteBook = (bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`, {
        method: 'DELETE'
    }).then(res => res.json());
};