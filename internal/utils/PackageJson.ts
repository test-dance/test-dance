import path from 'path';
import { PackageJson as PackageJsonSchema } from 'type-fest';

type PackageJsonField = keyof PackageJsonSchema;

class PackageJson {
  private static async _readByProject(project: string): Promise<PackageJsonSchema> {
    const fullPath = path.join(process.cwd(), project, 'package.json');
    return (await import(fullPath)).default;
  }

  private static async _getByFieldOnly<T extends PackageJsonField>(
    project: string,
    field: T
  ): Promise<PackageJsonSchema[T]> {
    return (await PackageJson._readByProject(project))[field];
  }

  public static async getFull(project: string): Promise<PackageJsonSchema> {
    return await PackageJson._readByProject(project);
  }

  public static async getScripts(project: string): Promise<PackageJsonSchema['scripts']> {
    return await PackageJson._getByFieldOnly(project, 'scripts');
  }

  public static async getDeps(project: string): Promise<PackageJsonSchema['dependencies']> {
    return await PackageJson._getByFieldOnly(project, 'dependencies');
  }

  public static async getDevDeps(project: string): Promise<PackageJsonSchema['devDependencies']> {
    return await PackageJson._getByFieldOnly(project, 'devDependencies');
  }
}

export {
  PackageJson
};
