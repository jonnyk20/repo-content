import React, {Component} from 'react';
import Tree from './Tree';
import Blob from './Blob';

class App extends Component {
  state = {
    repo: []
  }
  renderTree = (tree) => {

    if (tree.length === 0) {
      return;
    }
    return tree.map( item => {
      if (item.path === 'build/samplenested'){
        console.log('Sample Nested')
        console.log(item)
      }
      if (item.type === 'tree') {
        return <Tree  key={item.path} item={item} renderTree={this.renderTree} />
      } else {
        return <Blob  key={item.path} item={item} />
      }
    })
  }

  buildTree(tree){

  }

  handleClick = () => {
    const repo = [];
    fetch('https://api.github.com/repos/jonnyk20/repo-content/git/trees/master?recursive=1')
      .then(res => res.json())
        .then( data => {
          data.tree.forEach((item) => {
            const newObject = {
              type: item.type,
              path: item.path,
              sha: item.sha,
              items: item.type == 'tree' ? [] : null
            };
            const parentTree = (item.path.split('/')[0] !== item.path) ? item.path.split('/')[0] : 'root';
            newObject.parentTree = parentTree;
            if (parentTree === 'root') {
              repo.push(newObject);
            } else {
              /* find belonging repo object */
              const tree = repo.find( object => object.path === item.path.split('/')[0])
               /* push item into repo object */
              tree.items.push(newObject);
            }
          }
        );
          this.setState({
            repo
          })
        })
  }

  render() {
    return (
      <div>
        <h1>Repository Contents</h1>
        <button onClick={this.handleClick}>Get Repo Tree</button>
        <div> Repository Tree </div>
        <ul>
          { this.renderTree(this.state.repo) }
        </ul>
      </div>
    );
  }
}
export default App;
