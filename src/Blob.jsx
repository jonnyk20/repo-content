import React from 'react';
import { string, object } from 'prop-types';

const Blob = ({ object: { path } }) => <li> Blob: {path}  </li>;

Blob.propTypes = {
  object,
  path: string
};

export default Blob;
