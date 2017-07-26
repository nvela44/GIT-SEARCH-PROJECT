import React, { Component } from "react";
import GithubUser from "./GithubUser";

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var self = this; // What's this?? Make sure you remember or understand what this line does

    fetch(
      `https://api.github.com/users/${this.props.params.username}/following`
    )
      .then(resp => resp.json())
      .then(following => {
        // Why that.setState instead of this.setState??
        self.setState({
          following: following
        });
      });
  }

  render() {
    // If the state doesn't have a followers key, it means the FETCH didn't complete yet. Simply render a LOADING indicator.
    if (!this.state.following) {
      return <div className="followers-page">LOADING...</div>;
    }

    // Look in app.css for the styles that make this look like it does
    return (
      <div className="followers-page">
        <h3>
          Followed by {this.props.params.username}
        </h3>
        <ul className="followers-list">
          {this.state.following.map(function(user) {
            return (
              <li key={user.id}>
                <GithubUser user={user} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Following;
