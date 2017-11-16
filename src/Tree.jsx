import React from 'react';
import { func, object, string, array } from 'prop-types';

function Tree({ renderTree, object: { path, gitObjects } }) {
  return (
    <li>
      Tree: {path}
      <ul>
        {renderTree(gitObjects)}
      </ul>
    </li>
  );
}

export default Tree;

Tree.propTypes = {
  renderTree: func,
  object,
  path: string,
  gitObjects: array
};
