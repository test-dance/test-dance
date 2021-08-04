import { spawnPromised } from './promised-spawn';
import { PackageJson } from './PackageJson';

type CommandList = 'build' | 'test' | 'start' | 'report' | 'prerelease';

class Commands {
  private static async _checkCommandExistence(project: string, command: string): Promise<boolean> {
    const scriptsInProject = await PackageJson.getScripts(project);
    return Boolean(scriptsInProject?.[command]);
  }

  private static async _executeCommand(project: string, command: string): Promise<void> {
    const isCommandExistence = await Commands._checkCommandExistence(project, command);
    const projectScripts = await PackageJson.getScripts(project);
    const currentCommand = projectScripts?.[command];

    if (!isCommandExistence || !currentCommand) {
      return;
    }

    await spawnPromised(`CURRENT_PROJECT=${project} ${currentCommand}`);
  }

  public static async build(project: string): Promise<void> {
    await Commands._executeCommand(project, 'build');
  }

  public static async test(project: string): Promise<void> {
    await Commands._executeCommand(project, 'test');
  }

  public static async start(project: string): Promise<void> {
    await Commands._executeCommand(project, 'start');
  }

  public static async report(project: string): Promise<void> {
    await Commands._executeCommand(project, 'report');
  }

  public static async prerelease(project: string): Promise<void> {
    await Commands._executeCommand(project, 'prerelease')
  }
}

const commandNameToExecutor: {[K in CommandList]: Function} = {
  build: Commands.build,
  test: Commands.test,
  start: Commands.start,
  report: Commands.report,
  prerelease: Commands.prerelease
};

export {
  commandNameToExecutor,
  CommandList,
  Commands
};
