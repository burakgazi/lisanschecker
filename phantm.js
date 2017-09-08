/**
 * Package dependencies
 */
const Horseman = require('node-horseman');
const fs = require('fs');

/**
 * Path to the PhantomJS binary
 */
const PATH_TO_PHANTOM = `${__dirname}/node_modules/phantomjs-prebuilt/bin/phantomjs`;

/**
 * Loads a Horseman instance to facilitate interaction with PhantomJS
 */
module.exports = () => {
    const options = {
        phantomPath: PATH_TO_PHANTOM,
        loadImages: true,
        injectJquery: true,
        webSecurity: true,
        ignoreSSLErrors: true,
    };

    const phantomInstance = new Horseman(options);

    phantomInstance.on('consoleMessage', (msg) => {
        // console.log('Phantom page log: ', msg);
    });

    phantomInstance.on('error', (msg) => {
        // console.log('Phantom page error: ', msg);
    });

    return phantomInstance;
};
