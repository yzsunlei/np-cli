import program from 'commander';
import np from './index';
import { version } from '../package.json';
import { dirs, alias } from './utils/defs';
import rc from './utils/rc';

function help() {
  console.log('');
  console.log('  How to use:');
  console.log();
  console.log('    - np install');
  console.log('    - np init');
  console.log('    - np update');
  console.log('    - np search');
  console.log('    - np uninstall <installed template>');
  console.log('    - np clear');
  console.log('    - np config set <k> <v>');
  console.log('    - np config remove <k>');
  console.log('    - np config get <k>');
  console.log('    - np config help');
  console.log();
}

function registeredProgram(commander, type, typeInfo) {
  commander
    .command(type)
    .description(typeInfo[type])
    .alias(alias[type])
    .action(async () => {
      try {
        if (type === 'config') {
          await np('config', ...process.argv.slice(3));
        } else if (type === 'help') {
          help();
        } else {
          await np(type);
        }
      } catch (e) {
        console.log(e);
      }
    });

  return commander;
}

try {
  (async function run() {
    const registry = await rc('registry');
    const programTypes = {
      install  : `install remote templates from https://github.com/${registry}`,
      uninstall: `uninstall a installed template in ${dirs.download}`,
      init     : 'generate a new project from a template',
      clear    : 'clear all installed template',
      update   : `update the installed template in ${dirs.download}`,
      list     : 'list installed template',
      search   : 'search the templates from your github organization/user',
      help     : 'more help info:',
      config   : `${dirs.rc} config file set and get`,
      '*'      : 'the command is not found'
    };
    program.version(version, '-v, --version')
      .usage('<command> [options]');

    Object.keys(programTypes)
      .reduce((pre, type) => registeredProgram(pre, type, programTypes), program);

    program.on('-h', help);
    program.on('--help', help);

    program.parse(process.argv);
  }());
} catch (e) {
  console.log(e);

  help();
}

