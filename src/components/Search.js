import React from "react";
import { browserHistory as history } from "react-router";

//We gonna need a class here
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    history.push(`/user/${this.refs.userInput.value}`);
  }

  render() {
    return (
      <div className="search-page">
        <h2>Enter a GitHub username</h2>
        <form onSubmit={this.handleSubmit}>
          <input ref="userInput" className="search-page__input" type="text" />
          <button className="search-page__button">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
