import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { Text } from 'ink';
import { Link } from '../../utils/link';
import { getProjects } from '../../utils/get-projects';

const AppRollbackLinks: FunctionComponent = () => {
  const render = useCallback(() => {
    return (
      <Text>Rollback linked dependencies</Text>
    );
  }, []);

  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      await Promise.all(projects.map(async (project) => await Link.rollback(project)));
    })();
  }, []);

  return render();
};

export {
  AppRollbackLinks
};
