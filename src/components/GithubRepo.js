import React from "react";

const GithubRepo = props => {
  var url = props.repo.html_url;
  var name = props.repo.full_name;
  var stars = props.repo.stargazers_count;

  return (
    <a target="_blank" className="github-repotag" href={url}>
      {name} <span className="github-repotag__stars">{stars}★</span>
    </a>
  );
};

export default GithubRepo;
