import path from 'path';
import typeScript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-import-css';
import { visualizer } from 'rollup-plugin-visualizer';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const rootPath = process.cwd();
const currentPackage = process.env.CURRENT_PROJECT || '';
const projectPath = path.join(rootPath, currentPackage);

const srcPath = path.join(projectPath, 'src');
const inputPath = path.join(projectPath, 'src/index.ts');
const outputPath = path.join(projectPath, 'out/index.js');
const outputCSSPath = path.join(projectPath, 'index.css');
const testsPath = path.join(projectPath, 'tests');
const tsconfigPath = path.join(rootPath, 'tsconfig.json');
const reportsVisualizerPath = path.join(projectPath, 'reports/build.html');
const reportsSnapshotPath = path.join(projectPath, 'reports/build-snapshot.json');

export default {
  input: inputPath,
  output: {
    file: outputPath,
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
      rootDir: srcPath
    }),
    css({
      output: outputCSSPath,
      minify: true,
      alwaysOutput: false
    }),
    typeScript({
      cwd: projectPath,
      tsconfig: tsconfigPath,
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          declaration: true,
          allowJs: false,
          checkJs: false
        },
        include: [
          `${projectPath}/**/*.ts`
        ],
        exclude: [
          testsPath,
        ]
      }
    }),
    visualizer({filename: reportsVisualizerPath}),
    sizeSnapshot({snapshotPath: reportsSnapshotPath}),
    terser()
  ]
};
