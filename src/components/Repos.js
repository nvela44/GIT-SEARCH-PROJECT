import React, { Component } from "react";
import GithubRepo from "./GithubRepo";

class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let self = this;
    fetch(
      `https://api.github.com/users/${this.props.params
        .username}/repos?sort=updated`
    )
      .then(resp => resp.json())
      .then(repos => {
        // Why that.setState instead of this.setState??
        self.setState({
          repos: repos
        });
      });
  }

  render() {
    // If the state doesn't have a repos key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
    if (!this.state.repos) {
      return <div className="followers-page">LOADING...</div>;
    }

    // Look in app.css for the styles that make this look like it does
    return (
      <div className="followers-page">
        <h3>
          {this.props.params.username}'s repos
        </h3>
        <ul className="followers-list">
          {this.state.repos.map(function(repo) {
            return (
              <li key={repo.id}>
                <GithubRepo repo={repo} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Repos;
