const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['placekitten.com'],
  },
  /**
   * Pass custom node-sass options.
   */
  sassOptions: {
    /**
     * Include `styles/abstracts` directory in Sass paths.
     *
     * @see https://github.com/sass/node-sass/#includepaths
     */
    includePaths: [path.join(__dirname, 'styles/abstracts')],

    /**
     * Automatically import abstracts into stylesheets.
     *
     * @see https://webpack.js.org/loaders/sass-loader/#additionaldata
     */
    additionalData: "@import 'styles/abstracts';",
  },
};
