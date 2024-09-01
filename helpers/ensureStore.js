const path = require('path');
const Storage = require('node-storage');

function ensureStorage () {
    const store = new Storage(path.join(__dirname, '../store/store.js'));
    return store;
}

module.exports = ensureStorage;