import React, { Component } from 'react';
import Tree from './Tree';
import Blob from './Blob';

class App extends Component {

  state = {
    gitObjects: []
  }

  getTree(treeData) {
    const rootTree = { path: '/', gitObjects: [] };
    treeData.tree.forEach(({ path, type, sha }) => {
      const newObject = {
        type,
        path,
        sha,
        gitObjects: type === 'tree' ? [] : null
      };
      const splitPath = newObject.path.split('/');
      const hasParent = splitPath.length > 1;
      if (hasParent) {
        const parentPaths = splitPath.slice(0, splitPath.length - 1);
        // navigates from root into nested objects until we
        // reach the one in which we need to insert this child obejct
        let directParent = rootTree;
        let pathString = '';
        parentPaths.forEach((pathSegment, i, arr) => {
          pathString += pathSegment;
          directParent = directParent.gitObjects.find(child => child.path === pathString);
          if (i === arr.length - 1) { // if we've reached the actual direct parent
            directParent.gitObjects.push(newObject);
          } else {
            pathString += '/'; // if we need go one more level in, this will seperate following PathSegment on next iteration
          }
        });
      } else { // if parent is root
        rootTree.gitObjects.push(newObject);
      }
    });
    this.setState({
      gitObjects: rootTree.gitObjects
    });
  }

  renderTree = (tree) => {
    return tree.map((object) => {
      return object.type === 'tree' ?
      <Tree key={object.path} object={object} renderTree={this.renderTree} /> :
      <Blob key={object.path} object={object} />;
    });
  }

  handleClick = () => {
    fetch('https://api.github.com/repos/jonnyk20/repo-content/git/trees/master?recursive=1')
      .then(res => res.json())
      .then(data => this.getTree(data));
  }

  render() {
    return (
      <div>
        <h1>Repository Contents</h1>
        <button onClick={this.handleClick}>Get Repo Tree</button>
        <div> Repository Tree </div>
        <ul>
          { this.renderTree(this.state.gitObjects) }
        </ul>
      </div>
    );
  }
}
export default App;
