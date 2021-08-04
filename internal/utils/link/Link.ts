import path from 'path';
import fs from 'fs/promises';
import { spawnPromised } from '../promised-spawn';

class Link {
  private static async _getPackageNames(): Promise<string[]> {
    const packagesPath = path.join(process.cwd(), '/packages');
    return await fs.readdir(packagesPath);
  }

  private static async _createLink(packageName: string): Promise<void> {
    await spawnPromised(`cd packages/${packageName} && yarn link`);
  }

  private static async _addCreatedLink(projectPath: string, packageName: string): Promise<void> {
    await spawnPromised(`cd ${projectPath} && yarn link "${packageName}"`);
  }

  private static async _deleteLinkOrigin(packageName: string): Promise<void> {
    await spawnPromised(`cd packages/${packageName} && yarn unlink`);
  }

  private static async _deleteLinkFromProject(projectPath: string, packageName: string): Promise<void> {
    await spawnPromised(`cd ${projectPath} && yarn unlink "${packageName}"`);
  }

  private static async _installDeps(projectPath: string): Promise<void> {
    await spawnPromised(`cd ${projectPath} && yarn install --check-files`)
  }

  public static async bootstrap(): Promise<void> {
    const packageNames = await Link._getPackageNames();

    await Promise.all(
      packageNames.map(async (packageName) => await Link._createLink(packageName))
    );
  }

  public static async rollback(projectPath: string, packages?: string[]): Promise<void> {
    const packageNames = packages || await Link._getPackageNames();

    await Promise.all(
      packageNames.map(async (packageName) => await Link._deleteLinkFromProject(projectPath, packageName))
    );

    await Promise.all(
      packageNames.map(async (packageName) => await Link._deleteLinkOrigin(packageName))
    )

    await Link._installDeps(projectPath);
  }

  public static async addLinks(projectPath: string, packages: string[]): Promise<void> {
    await Promise.all(
      packages.map(async (packageName) => await Link._addCreatedLink(projectPath, packageName))
    );
  }
}

export {
  Link
};
