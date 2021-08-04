import fs from 'fs/promises';
import path from 'path';
import { copy } from 'fs-extra';

type TemplateTypes = 'app' | 'service' | 'frontend-package' | 'backend-package';

const templatesRootPath = path.join(process.cwd(), './internal/templates');

const templateTypeToDist = new Map<TemplateTypes, string>([
  ['app', 'apps'],
  ['service', 'services'],
  ['frontend-package', 'packages'],
  ['backend-package', 'packages']
]);

async function getTemplates(): Promise<string[]> {
  return await fs.readdir(templatesRootPath);
}

async function createProjectByTemplate(name: string, type: TemplateTypes): Promise<string> {
  const currentTemplatePath = path.join(templatesRootPath, type);
  const projectName = [templateTypeToDist.get(type)!, name].join('/');
  const distProjectPath = path.join(process.cwd(), projectName);

  await copy(currentTemplatePath, distProjectPath);
  return projectName;
}

export {
  TemplateTypes,
  getTemplates,
  createProjectByTemplate
};
