import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { Loader } from '../../utils/Loader';
import { Input } from '../../utils/Input';
import { getTemplates, createProjectByTemplate, TemplateTypes } from '../../utils/templates';
import { PlaceholderReplacer } from '../../utils/PlaceholderReplacer';

enum Step {
  TEMPLATE_TYPE,
  PROJECT_NAME,
  PROJECT_DESCRIPTION
}

const AppCreate: FunctionComponent = () => {
  const [step, setStep] = useState<Step | null>(null);
  const [templateList, setTemplateList] = useState<{label: string, value: string}[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateTypes | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  const onSelectProjectType = useCallback(({value}) => {
    setCurrentTemplate(value);
    setStep(Step.PROJECT_NAME);
  }, []);

  const onSubmitProjectName = useCallback(async (value) => {
    setProjectName(value);
    setStep(Step.PROJECT_DESCRIPTION);
  }, []);

  const onSubmitProjectDescription = useCallback(async (value) => {
    setLoading(true);
    const projectPath = await createProjectByTemplate(projectName!, currentTemplate!);

    await PlaceholderReplacer.replace(projectPath, projectName!, value);
    setLoading(false);

    setStep(null);
    process.exit(0);
  }, [currentTemplate, projectName]);

  const renderTemplateTypeStep = useCallback(() => (
    <Box flexDirection="column">
      <Text>Choose template:</Text>
      <SelectInput items={templateList} onSelect={onSelectProjectType} />
    </Box>
  ), [templateList]);

  const renderProjectNameStep = useCallback(() => (
    <Input key={0} label="Enter project name" onSubmit={onSubmitProjectName} />
  ), [onSubmitProjectName]);

  const renderProjectDescriptionStep = useCallback(() => (
    <Input key={1} label="Enter project description (required!)" onSubmit={onSubmitProjectDescription} />
  ), [onSubmitProjectDescription]);

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    switch (step) {
      case Step.TEMPLATE_TYPE:
        return renderTemplateTypeStep();
      case Step.PROJECT_NAME:
        return renderProjectNameStep();
      case Step.PROJECT_DESCRIPTION:
        return renderProjectDescriptionStep();
      default:
        return null;
    }
  }, [isLoading, step, renderTemplateTypeStep, renderProjectNameStep, renderProjectDescriptionStep]);

  useEffect(() => {
    (async () => {
      const templates = await getTemplates();

      setStep(Step.TEMPLATE_TYPE);
      setTemplateList(() => templates.map((template) => ({label: template, value: template})));
      setLoading(false);
    })();
  }, []);

  return render();
};

export {
  AppCreate
};
