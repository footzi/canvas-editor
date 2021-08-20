module.exports = {
    port: 8000,
    nodeResolve: true,
    open: false,
    watch: true,
    appIndex: 'index.html',
    imeTypes: {
        // serve all json files as js
        '**/*.json': 'js'
    },
};