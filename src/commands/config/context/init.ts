import { Args } from '@oclif/core';
import Command from '../../../core/base';
import { initContext } from '../../../core/models/Context';
import { helpFlag } from '../../../core/flags/global.flags';
import { blueBright } from 'picocolors';
export default class ContextInit extends Command {
  static description = 'Initialize context';
  static flags = helpFlag();

  static contextFilePathMessage = `Specify directory in which context file should be created:
    - current directory          : ${blueBright('asyncapi config context init .')}(default)
    - root of current repository : ${blueBright('asyncapi config context init ./ ')}
    - user's home directory      : ${blueBright('asyncapi config context init ~`')}`;

  static args = {
    'context-file-path': Args.string({description: `${ContextInit.contextFilePathMessage}`, required: false})
  };

  async run() {
    const { args } = await this.parse(ContextInit);
    const contextFilePath = args['context-file-path'];

    const contextWritePath = await initContext(contextFilePath as string);
    this.log(`🎉 Context initialized at ${blueBright(contextWritePath)}`);
  }
}
