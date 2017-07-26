import React from "react";
import { Link } from "react-router";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.params.username !== this.props.params.username) {
      this.fetchUser();
    }
  }

  fetchUser() {
    fetch(
      `https://api.github.com/users/${this.props.params
        .username}?access_token=bdaec663803a76567ca120d7b13b510b845b4f6d`
    )
      .then(resp => resp.json())
      .then(user => {
        this.setState((prevState, props) => ({
          user: user
        }));
      })
      .catch(err => console.log(err));
  }

  /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
  renderStat(stat) {
    return (
      <li key={stat.name} className="user-info__stat">
        <Link to={stat.url}>
          <p className="user-info__stat-value">
            {stat.value}
          </p>
          <p className="user-info__stat-name">
            {stat.name}
          </p>
        </Link>
      </li>
    );
  }

  render() {
    //if state has no user property render this, otherwise continue on
    if (!this.state.user) {
      return <div className="user-page">LOADING......</div>;
    }

    //assuming the user is loaded, bc we check
    const user = this.state.user;

    // Gather up some number stats about the user, to be used in a map below
    const stats = [
      {
        name: "Public Repos",
        value: user.public_repos,
        url: `/user/${this.props.params.username}/repos`
      },
      {
        name: "Followers",
        value: user.followers,
        url: `/user/${this.props.params.username}/followers`
      },
      {
        name: "Following",
        value: user.following,
        url: `/user/${this.props.params.username}/following`
      }
    ];

    //Now we can render, sweet
    return (
      <div className="user-page">
        <div className="user-info">
          <Link className="user-info__text" to={`/user/${user.login}`}>
            <img
              className="user-info__avatar"
              src={user.avatar_url}
              alt={`${user.login} avatar`}
            />
            <h2 className="user-info__title">
              {user.login} ({user.name})
            </h2>
            <p className="user-info__bio">
              {user.bio}
            </p>
          </Link>

          <ul className="user-info__stats">
            {stats.map(this.renderStat)}
          </ul>
        </div>
        <div className="user-extra" />
        {this.props.children}
      </div>
    );
  }
}

export default User;
