import React, { FunctionComponent } from 'react';
import Spinner from 'ink-spinner';
import { Text, Box } from 'ink';

const Loader: FunctionComponent = () => {
  return (
    <Box>
      <Box marginRight={1}>
        <Text color="green">
          <Spinner type="dots" />
        </Text>
      </Box>
      <Text>Loading</Text>
    </Box>
  );
};

export {
  Loader
};
