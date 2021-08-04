import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { Loader } from '../../utils/Loader';
import { Link } from '../../utils/link';
import { getProjects, getPackages } from '../../utils/get-projects';

enum Steps {
  SELECT_PROJECT,
  CHOOSE_PACKAGES
}

const AppLink: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [step, setStep] = useState<Steps | null>(null);
  const [projects, setProjects] = useState<string[]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [packages, setPackages] = useState<string[]>([]);
  const [currentPackages, setCurrentPackages] = useState<string[]>([]);

  const onSelectProject = useCallback(async ({value}) => {
    setLoading(true);
    setStep(Steps.CHOOSE_PACKAGES);
    setCurrentProject(value);

    const allPackages = await getPackages();
    setPackages(allPackages);
    setLoading(false);
  }, []);

  const onSelectPackage = useCallback(async ({value}) => {
    if (value === 'select') {
      setStep(null);
      await Link.addLinks(currentProject!, currentPackages);
      return;
    }

    if (value === 'exit') {
      process.exit(0);
      return;
    }

    setCurrentPackages((prevState) => {
      return prevState.concat([value]);
    });
  }, [currentProject, currentPackages]);

  const renderSelectProjectStep = useCallback(() => (
    <Box flexDirection="column">
      <Text>Existing projects:</Text>
      <SelectInput
        items={projects.map((project) => ({label: project, value: project}))}
        onSelect={onSelectProject}
      />
    </Box>
  ), [projects]);

  const renderChooseProjectStep = useCallback(() => (
    <Box flexDirection="column">
      <Text>Current Project: {currentProject}</Text>
      <Text>Selected Packages: {currentPackages.join(', ')}</Text>
      <SelectInput
        items={
          packages
            .map((currentPackage) => ({value: currentPackage, label: currentPackage}))
            .concat([{
              value: 'select',
              label: 'command: select'
            },{
              value: 'exit',
              label: 'command: exit'
            }])
        }
        onSelect={onSelectPackage}
      />
    </Box>
  ), [packages, currentPackages, currentProject]);

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    switch (step) {
      case Steps.SELECT_PROJECT:
        return renderSelectProjectStep();

      case Steps.CHOOSE_PACKAGES:
        return renderChooseProjectStep();

      default:
        return null
    }
  }, [isLoading, step, renderSelectProjectStep, renderChooseProjectStep]);

  useEffect(() => {
    (async () => {
      const currentProjects = await getProjects();

      setLoading(false);
      setStep(Steps.SELECT_PROJECT);
      setProjects(currentProjects);
    })();
  }, []);

  return render();
};

export {
  AppLink
};
