const { flags } = require('@oclif/command');
const fs = require('fs');
const vm = require('vm');
const Module = require('module');
const BaseCommand = require('../lib/BaseCommand');

/**
 * Exec script file command
 */
class Exec extends BaseCommand {
  /**
   * Run command
   * @return {Promise<void>}
   */
  async run() {
    if (!this.gif) {
      this.error(this.errorMessages.notConnectedToGif);
    }

    await this.gif.connect();

    const { flags: { file } } = this.parse(Exec);

    const code = fs.readFileSync(file);
    const mod = new Module(file);

    const context = {
      module: mod,
      require: mod.require,
      console,
      gif: this.gif.commands,
      eth: this.eth,
      moment: this.moment,
    };

    const script = new vm.Script(code.toString('utf8'), { filename: file });
    await script.runInNewContext(context);

    await this.gif.shutdown();
  }
}

Exec.description = `execute file
...
Execute file
`;

Exec.flags = {
  file: flags.string({ char: 'f', description: 'file to execute', required: true }),
};

module.exports = Exec;
