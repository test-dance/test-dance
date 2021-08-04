import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { Loader } from '../../utils/Loader';
import { Input } from '../../utils/Input';
import { getProjects } from '../../utils/get-projects';

enum Step {
  SELECT_PROJECT,
  ENTER_DEPS
}

const AppAdd: FunctionComponent = () => {
  const [_, setProjects] = useState<string[]>([]);
  const [step, setStep] = useState<Step>(Step.SELECT_PROJECT);
  const [isLoading, setLoading] = useState(true);

  const onSubmit = useCallback((value: string) => {
    console.log(value);
  }, []);

  const onChooseProject = useCallback(() => {
    setStep(Step.ENTER_DEPS);
  }, []);

  const renderSelectProjectStep = useCallback(() => (
    <Box flexDirection="column">
      <Box>
        <Text>Choose project:</Text>
      </Box>
      <SelectInput items={[]} onSelect={onChooseProject} />
    </Box>
  ), [onChooseProject]);

  const renderTextInput = useCallback(() => (
    <Input label="Enter dependencies names" onSubmit={onSubmit} />
  ), [onSubmit]);

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    switch (step) {
      case Step.SELECT_PROJECT:
        return renderSelectProjectStep();
      case Step.ENTER_DEPS:
        return renderTextInput();
    }
  }, [step, isLoading, renderTextInput, renderSelectProjectStep]);

  useEffect(() => {
    (async () => {
      const currentProjects = await getProjects('app');
      setLoading(false);
      setProjects(currentProjects);
    })();
  }, []);

  return render();
};

export {
  AppAdd
};
