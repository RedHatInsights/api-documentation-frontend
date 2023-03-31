const { override, getBabelLoader } = require("customize-cra");
const path = require("path");
const {globSync} = require("glob");
const packageJson = require("./package.json");

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const configureMonaco = (config) => {
    config.plugins.push(new MonacoWebpackPlugin({
        languages: ['c', 'go', 'python', 'java', 'javascript', 'shell', 'cpp', 'ruby', 'json']
    }));

    return config;
}

/**
 * Allows to include code from other workspaces - the code is then compiled by typescript.
 * @param config
 * @returns {*}
 */
const addWorkspaces = (config) => {
    const loader = getBabelLoader(config, false);
    const workspaces = packageJson.workspaces;

    let packages;
    if ('packages' in workspaces) {
        packages = workspaces.packages;
    } else {
        packages = workspaces;
    }

    const resolvedPaths = globSync(packages)
        .map(p => path.normalize(path.join(process.cwd(), p)));

    if (typeof loader.include === 'string') {
        loader.include = [loader.include];
    }

    loader.include = [...loader.include, ...resolvedPaths];
    return config;
}

module.exports = override(
    addWorkspaces,
    configureMonaco
);
