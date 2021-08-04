import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { Loader } from './Loader';
import { commandNameToExecutor, CommandList } from './Commands';
import { getProjects } from './get-projects';

interface Props {
  command: CommandList;
}

const AppCommands: FunctionComponent<Props> = (props) => {
  const [projects, setProjects] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);

  const onSelectProject = useCallback(async ({value}) => {
    setLoading(true);
    await commandNameToExecutor[props.command](value);
    process.exit(0);
  }, [])

  const render = () => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <Box flexDirection="column">
        <Text>Choose project to {props.command}:</Text>
        <SelectInput
          items={projects.map((project) => ({label: project, value: project}))}
          onSelect={onSelectProject}
        />
      </Box>
    );
  };

  useEffect(() => {
    (async () => {
      const currentProjects = await getProjects();

      setProjects(currentProjects);
      setLoading(false);
    })();
  }, []);

  return render();
};

export {
  AppCommands
};
