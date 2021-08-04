import { exec } from 'child_process';

function spawnPromised(command: string, silent?: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = exec(command);

    !silent && stream.stdout!.pipe(process.stdout);
    stream.stderr!.pipe(process.stderr);

    stream.on('exit', () => {
      resolve();
    })

    stream.on('error', (data) => {
      reject(data);
    });
  });
}

export {
  spawnPromised
};
