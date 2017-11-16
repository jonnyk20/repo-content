import React, {Component} from 'react';

class App extends Component {
  state = {
    repo: []
  }
  renderRepo = () => {
    return this.state.repo.map( item => <li key={item.sha}> {item.path} </li>)
  }
  handleClick = () => {
    const repo = [];
    fetch('https://api.github.com/repos/jonnyk20/repo-content/git/trees/master?recursive=1')
      .then(res => res.json())
        .then( data => {
          data.tree.forEach((item) => repo.push(item));
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
          { this.renderRepo() }
        </ul>
      </div>
    );
  }
}
export default App;
