import fs from 'fs/promises';
import path from 'path';

const projectParts = ['packages', 'apps', 'services'];
const singleProjectParts = ['core', 'facade'];

async function getProjects(): Promise<string[]> {
  const rootDirPath = process.cwd();

  const result = await Promise.all(projectParts.map(async (projectPart) => {
    const projectPath = path.join(rootDirPath, projectPart);
    const dirInner = await fs.readdir(projectPath);

    return {
      part: projectPart,
      inner: dirInner
    };
  }));

  const rawResult = result
    .reduce((result, {part, inner}) => {
      return result.concat(inner.map((unit) => `${part}/${unit}`));
    }, [] as string[])
    .concat(singleProjectParts);

  const projectsWithPackageJson = await Promise.all((rawResult.map(async (project) => {
    const projectPath = path.join(process.cwd(), project);
    const dirInner = await fs.readdir(projectPath);

    return ({
      project,
      isProject: dirInner.includes('package.json')
    })
  })));

  return projectsWithPackageJson
    .filter(({isProject}) => isProject)
    .map(({project}) => project);
}

async function getPackages(): Promise<string[]> {
  const allProjects = await getProjects();

  return allProjects
    .filter((project) => project.split('/')[0] === 'packages')
    .map((currentPackage) => currentPackage.split('/')[1]!);
}

export {
  getProjects,
  getPackages
};
