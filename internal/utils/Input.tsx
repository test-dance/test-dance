import React, { FunctionComponent } from 'react';
import { Box, Text, TextProps } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';

interface Props {
  onSubmit: (value: string) => void;
  label: string;
  labelColor?: TextProps['color'];
}

const Input: FunctionComponent<Props> = (props) => {
  return (
    <Box>
      <Box marginRight={1}>
        <Text color={props.labelColor}>
          {props.label}:
        </Text>
      </Box>
      <UncontrolledTextInput onSubmit={props.onSubmit} />
    </Box>
  );
};

export {
  Input
};
