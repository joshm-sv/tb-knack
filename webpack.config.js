// Import required modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
const fs = require('fs');

// An array of paths to specific JavaScript files
const jsFilesToAdd = [
  './js/image_uploader/imageUploadIntegrationArray.js',
  './js/image_uploader/imageuploader.js',
  './js/image_uploader/filepondIntegration.js',
  './js/api/KnackApi.js',
  './js/api/KnackViewApi.js',
  './js/api/KnackJsApi.js',
];

// Get the absolute path of the 'renders' folder inside the 'js' folder
// const jsFolderPath = path.resolve(__dirname, 'js/renders');
// // Get the names of all subfolders within the 'js/renders' folder and map those names to their absolute paths
// const subFolderPaths = fs.readdirSync(jsFolderPath).map(subfolder => path.join(jsFolderPath, subfolder));

// // For each subfolder path, get an array of JavaScript file paths and add them to 'jsFilesToAdd'
// subFolderPaths.forEach(function(subfolderPath) {
//   const files = fs.readdirSync(subfolderPath);

//   const jsFiles = files.filter(file => path.extname(file) === '.js')
//     .map(file => path.relative('./src', path.join(subfolderPath, file)));

//   jsFilesToAdd.push(...jsFiles);
// });

// Export a configuration object used by Webpack to bundle and optimize code for development
module.exports = {
  // The mode determines how Webpack optimizes the code ('development' or 'production')
  mode: 'production',
  // Generate source maps to help with debugging
  devtool: 'source-map',
  // An object that specifies the entry point(s) for the bundle (in this case, just one named 'bundle'), and lists the files to include in that bundle
  entry: {
    bundle: jsFilesToAdd
  },
  // Determine the filename format for the output files generated by Webpack
  output: {
    filename: '[name].js'
  },
  // An array of plugins to further customize how Webpack bundles and optimizes code (in this case, just one plugin that minifies the code)
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
