import * as startCase from 'lodash.startcase';

import {API, Rest, DAO, Client} from './API';

import {log, catRoot, setLogLevel} from './api/Log';
import {
  Category,
  CategoryServiceFactory,
  CategoryDefaultConfiguration,
  LogLevel,
} from 'typescript-logging';

/** @hidden */
function CLI() {
  const catCLI = new Category('cli', catRoot);

  // tslint:disable
  const cliff = require('cliff');
  const colors = require('colors');
  const fs = require('fs');
  const path = require('path');
  const program = require('commander');
  // tslint:enable

  const homedir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  const defaultConfigFile = path.join(homedir, '.opennms-cli.config.json');

  /* tslint:disable:object-literal-sort-keys */
  const COLORS = Object.freeze({
    INDETERMINATE: 'grey',
    CLEARED: 'white',
    NORMAL: 'green',
    WARNING: 'magenta',
    MINOR: 'yellow',
    MAJOR: 'orange',
    CRITICAL: 'red',
  });
  /* tslint:enable:object-literal-sort-keys */

  function readConfig() {
    const configfile = program.config || defaultConfigFile;
    let config;
    if (fs.exists) {
      config = JSON.parse(fs.readFileSync(configfile));
    } else {
      config = {
        password: undefined,
        url: undefined,
        username: undefined,
      };
    }
    return config;
  }

  /* tslint:disable:no-console */

  // global options
  program
    .option('-d, --debug', 'Enable debug output', () => {
      setLogLevel(LogLevel.Debug);
    })
    .option('-c, --config <file>', 'Specify a configuration file (default: ~/.opennms-cli.config.json)');

  // connect (validate server and save config)
  program
    .command('connect [url]')
    .description('Connect to an OpenNMS Horizon or Meridian server')
    .option('-u, --username <username>', 'The username to authenticate as (default: admin)')
    .option('-p, --password <password>', 'The password to authenticate with (default: admin)')
    .action((url, options) => {
      const config = readConfig();
      if (url) {
        config.url = url;
      }
      if (options.username) {
        config.username = options.username;
      }
      if (options.password) {
        config.password = options.password;
      }
      const auth = new API.OnmsAuthConfig(config.username, config.password);
      const server = new API.OnmsServer('OpenNMS', config.url, auth);
      const http = new Rest.AxiosHTTP(server);
      return Client.checkServer(server, http).then(() => {
        console.log(colors.green('Connection succeeded.'));
        if (!program.config) { // don't write the config if a config was passed in
          log.debug('Saving configuration to ' + defaultConfigFile, catCLI);
          fs.writeFileSync(defaultConfigFile, JSON.stringify(config, undefined, 2), { mode: 0o600 });
        }
        return true;
      }).catch((err) => {
        if (program.debug) {
          log.error('Connection failed: ' + err.message, err, catCLI);
        } else {
          log.error('Connection failed: ' + err.message, undefined, catCLI);
        }
      });
    });

  // list server capabilities
  program
    .command('capabilities')
    .description('List the API capabilities of the OpenNMS server')
    .action(() => {
      const config = readConfig();
      const auth = new API.OnmsAuthConfig(config.username, config.password);
      const server = new API.OnmsServer('OpenNMS', config.url, auth);
      const http = new Rest.AxiosHTTP(server);
      return Client.getMetadata(server, http).then((res) => {
        let c = colors.green;
        if (res.data.type === API.ServerType.MERIDIAN) {
          console.log(colors.blue('OpenNMS Meridian ' + res.data.version.displayVersion + ' Capabilities:'));
          c = colors.blue;
        } else {
          console.log(colors.green('OpenNMS Horizon ' + res.data.version.displayVersion + ' Capabilities:'));
        }
        console.log('');

        const caps = res.data.capabilities();
        const rows = [];
        for (const cap in caps) {
          if (cap === 'type') {
            continue;
          }
          rows.push([startCase(cap) + ':', caps[cap]]);
        }
        console.log(cliff.stringifyRows(rows));
        console.log('');

        return res;
      }).catch((err) => {
        if (program.debug) {
          log.error('Capabilities check failed: ' + err.message, err, catCLI);
        } else {
          log.error('Capabilities check failed: ' + err.message, undefined, catCLI);
        }
      });
    });

  const alarmHeaders = ['ID', 'Severity', 'Node', 'Count', 'Last', 'Log'];

  const formatAlarms = (alarms) => {
    return alarms.map((alarm) => {
      return {
        count: alarm.count,
        id: alarm.id,
        log: (alarm.logMessage && alarm.logMessage.length > 40)
          ? alarm.logMessage.slice(0, 40) + '...'
          : alarm.logMessage,
        node: alarm.nodeLabel,
        severity: alarm.severity ? colors[COLORS[alarm.severity.label]](alarm.severity.label) : '',
        time: alarm.lastEventTime ? alarm.lastEventTime.format('YYYY-MM-DD HH:ss') : '',
      };
    });
  };

  // list current alarms
  program
    .command('alarms')
    .description('List current alarms')
    .action(() => {
      const config = readConfig();
      const auth = new API.OnmsAuthConfig(config.username, config.password);
      const server = new API.OnmsServer('OpenNMS', config.url, auth);
      const http = new Rest.AxiosHTTP(server);
      const dao = new DAO.AlarmDAO(http);
      return dao.get(403236).then((alarm) => {
        const headers = ['id', 'severity', 'node', 'count', 'time', 'log'];
        console.log(cliff.stringifyObjectRows(formatAlarms([alarm]), headers, ['red']));
      }).catch((err) => {
        if (err.stack) {
          log.error(err.stack, err, catCLI);
        }
        return err;
      });
    });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

CLI();