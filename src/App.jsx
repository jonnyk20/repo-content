import React, {Component} from 'react';
import Tree from './Tree';
import Blob from './Blob';

class App extends Component {
  state = {
    gitObjects: []
  }
  getTree(treeData){
    const rootTree = { path: '/', gitObjects: [] };
    treeData.tree.forEach(({ path, type, sha }) => {
      const newObject = {
        type: type,
        path: path,
        sha: sha,
        gitObjects: type == 'tree' ? [] : null
      };
      const splitPath = newObject.path.split('/');
      const hasParent = splitPath.length > 1;
      if (hasParent){
        const parentPaths = splitPath.slice(0, splitPath.length - 1)
        // navigates from root into nested objects until we reach the one in which we need to insert this child obejct
        let directParent = rootTree;
        let paths = '';
        parentPaths.forEach((path, i, arr) => {
          paths += path;
          directParent = directParent.gitObjects.find((child) => {return child.path === paths})
          if (i === arr.length - 1){
            directParent.gitObjects.push(newObject)
          } else {
            paths += '/';
          }
        })
      } else { // if parent is root
        rootTree.gitObjects.push(newObject);
     }
    }
  );
    this.setState({
      gitObjects: rootTree.gitObjects
    })
  }

  renderTree = (tree) => {
    return tree.map( object => {
      if (object.type === 'tree') {
        return <Tree  key={object.path} object={object} renderTree={this.renderTree} />
      } else {
        return <Blob  key={object.path} object={object} />
      }
    })
  }

  handleClick = () => {
    fetch('https://api.github.com/repos/jonnyk20/repo-content/git/trees/master?recursive=1')
      .then(res => res.json())
        .then( data => {
          this.getTree(data);
        })
  }

  render() {
    return (
      <div>
        <h1>Repository Contents</h1>
        <button onClick={this.handleClick}>Get Repo Tree</button>
        <div> Repository Tree </div>
        <ul>
          { this.state.gitObjects.length > 0 && this.renderTree(this.state.gitObjects) }
        </ul>
      </div>
    );
  }
}
export default App;
