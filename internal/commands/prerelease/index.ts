import { createElement } from 'react';
import { render } from 'ink';
import { AppCommands } from '../../utils/AppCommands';

render(createElement(AppCommands, {command: 'prerelease'}));
