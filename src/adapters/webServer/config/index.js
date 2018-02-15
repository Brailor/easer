import path from 'path'
import thisPackage from '../../../../package.json'

const defaultsBasePath = __dirname + '/defaults'

/**
 * The default configuration for the webServer
 *
 *  {
 *      app: {
 *          name: {String},             // The name of the generator tool
 *          version: {String}           // The version of the generator tool
 *      },
 *      configFileName: {String},       // The name of the config file '.rest-tool.yml',
 *      logLevel: {String},             // The log level: (info | warn | error | debug)
 */
module.exports = {
    webServer: {
        users: process.env.EASER_USERS || defaultsBasePath + '/users.yml',
        port: process.env.EASER_PORT || 3007,
        viewsPath: process.env.EASER_VIEWSPATH || defaultsBasePath + '/views',
        publicPagesPath: process.env.EASER_CONTENTPATH_PUBLIC || defaultsBasePath + '/content/public',
        privatePagesPath: process.env.EASER_CONTENTPATH_PRIVATE || defaultsBasePath + '/content/private'
    }
}