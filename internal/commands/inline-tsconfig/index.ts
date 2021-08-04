import path from 'path';
import fs from 'fs/promises';
import { argv } from '../../utils/argv';

(async () => {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const tsconfigRaw = await fs.readFile(tsconfigPath);
  const tsconfigParsed = JSON.parse(tsconfigRaw.toString());
  const tsconfig = {
    compilerOptions: {
      ...tsconfigParsed.compilerOptions,
      declaration: true,
      outDir: `${process.env.CURRENT_PROJECT}/out`,
      rootDir: `${process.env.CURRENT_PROJECT}/src`
    }
  };

  if (argv.json) {
    console.log(JSON.stringify(tsconfig));
    return;
  }

  const output = Object.entries(tsconfig.compilerOptions)
    .map(([key, value]) => `--${key} ${value}`)
    .join(' ');

  console.log(output);
})();