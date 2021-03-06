'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yargs = require('yargs');

var parse = function parse(defaults) {
    var processArgv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.argv;


    var argv = yargs()
    //        .exitProcess(false)

    .option("config", {
        alias: "c",
        desc: "The name of the configuration file",
        default: defaults.configFileName
    }).option("port", {
        alias: "p",
        desc: "The port the server will listen",
        type: 'string',
        default: defaults.webServer.port
    }).option("restApiPath", {
        alias: "r",
        desc: "The path to the REST API descriptors",
        type: 'string',
        default: defaults.webServer.restApiPath
    }).option("usePdms", {
        alias: "u",
        desc: "Use Pattern Driven Micro-Service adapter to forward REST API calls",
        type: 'boolean',
        default: defaults.webServer.usePdms
    }).option("useCompression", {
        alias: "s",
        desc: "Use middleware to compress response bodies for all request",
        type: 'boolean',
        default: defaults.webServer.useCompression
    }).option("natsUri", {
        alias: "n",
        desc: "NATS server URI used by the pdms adapter.",
        type: 'string',
        default: defaults.pdms.natsUri
    })
    // WebSocket related parameters
    .option("forward", {
        alias: "f",
        desc: "Forwards messages among inbound and outbound topics",
        type: 'boolean',
        default: defaults.wsServer.forwardTopics
    }).option("forwarderEvent", {
        alias: "e",
        desc: "The name of the event the server is listen to forward the incoming messages",
        type: 'string',
        default: defaults.wsServer.forwarderEvent
    }).option("inbound", {
        alias: "i",
        desc: "Comma separated list of inbound NATS topics to forward through websocket",
        type: 'string',
        default: ""
    }).option("outbound", {
        alias: "o",
        desc: "Comma separated list of outbound NATS topics to forward towards from websocket",
        type: 'string',
        default: ""
    }).demandOption([]).showHelpOnFail(false, 'Specify --help for available options').help().parse(processArgv.slice(2));

    var results = {
        command: {
            name: 'server',
            args: {}
        },
        cliConfig: {
            configFileName: argv.config,
            webServer: {
                port: argv.port,
                restApiPath: argv.restApiPath,
                usePdms: argv.usePdms,
                useCompression: argv.useCompression
            },
            wsServer: {
                forwardTopics: argv.forward,
                forwarderEvent: argv.forwarderEvent
            },
            wsPdmsGw: {
                topics: {
                    inbound: argv.inbound != "" ? _lodash2.default.map(argv.inbound.split(','), function (t) {
                        return t.trim();
                    }) : [],
                    outbound: argv.outbound != "" ? _lodash2.default.map(argv.outbound.split(','), function (t) {
                        return t.trim();
                    }) : []
                }
            },
            pdms: {
                natsUri: argv.natsUri
            }
        }
    };

    console.log('cliResults', results);
    return results;
};

module.exports = {
    parse: parse
};