const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {  
    config.plugins.push(new MonacoWebpackPlugin({
        languages: ['c', 'go', 'python', 'java', 'javascript', 'shell']
    }));
    return config;
}
