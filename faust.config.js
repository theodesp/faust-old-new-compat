import { setConfig } from '@faustwp/core';
import possibleTypes from './possibleTypes.json';

export default setConfig({
  experimentalToolbar: true, // Enable experimental toolbar
  possibleTypes,
});