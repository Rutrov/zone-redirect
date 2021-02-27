const path = require('path')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'zone-redirect.js',
        path: path.resolve(__dirname)
    }
}