import path from 'path';
import readdirRecursive from 'fs-readdir-recursive';
import fs from 'fs/promises';

class PlaceholderReplacer {
  public static async replace(projectPath: string, projectName: string, projectDescription: string): Promise<void> {
    const fullPath = path.join(process.cwd(), projectPath);
    const files = readdirRecursive(fullPath);

    await Promise.all(files.map(async (filePathPart) => {
      const fullFilePath = path.join(fullPath, filePathPart);

      const fileContent = await fs.readFile(fullFilePath);
      const updatedFileContentByName = fileContent.toString().replace(/{{name}}/g, projectName);
      const updatedFileContentByDescription = updatedFileContentByName.replace(/{{description}}/g, projectDescription);

      await fs.writeFile(fullFilePath, updatedFileContentByDescription);
    }));
  }
}

export {
  PlaceholderReplacer
};
