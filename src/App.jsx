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
    // return (
    //   this.state.repo.map((item) => {
    //     return (
    //       <li key={item.path}> {item.path} </li>
    //     )
    //   })
    // )
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

  handleClick = () => {
    const repo = [];
    fetch('https://api.github.com/repos/jonnyk20/repo-content/git/trees/master?recursive=1')
      .then(res => res.json())
        .then( data => {
          const repo = { path: '/', items: [] };
          data.tree.forEach((item) => {
            const newObject = {
              type: item.type,
              path: item.path,
              sha: item.sha,
              items: item.type == 'tree' ? [] : null
            };
            console.log('path:', newObject.path)
            const splitPath = newObject.path.split('/');
            console.log('split path:', splitPath)
            const hasParent = splitPath.length > 1;
            console.log('has parent:', hasParent)
            if (hasParent){
              const parentPaths = splitPath.slice(0, splitPath.length - 1)
              console.log(parentPaths)
              console.log('parent', parentPaths)
              let directParent = repo;
              let paths = '';
              console.log('---looop---')
              parentPaths.forEach((path, i, arr) => {
                console.log('-iteration-')
                paths += path;
                console.log('direct parent:', directParent)
                if (typeof directParent === 'object'){
                  console.log('finding direct parent where path is', path)
                  directParent = directParent.items.find((child) => {return child.path === paths})
                }
                console.log('direct parent has changed to', directParent)
                if (i === arr.length -1){
                  console.log('final one, inserting')
                } else {
                  paths += '/';
                }
                directParent.items.push(newObject)
              })
            } else {
              repo.items.push(newObject);
           }
          }
        );
          this.setState({
            repo: repo.items
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
