import React from "react";

const MostVotes = props => {
  const anecdotes = props.anecdotes;
  const pinnat = props.pisteet;

  const findIndexOfMostVoted = () => {
    return pinnat.indexOf(Math.max(...pinnat));
  };

  const findMostVoted = () => {
    const indexOfVoted = findIndexOfMostVoted();
    console.log("suosituin " + indexOfVoted);

    if (0 === pinnat.indexOf(indexOfVoted)) {
      console.log("mitään ei vielä äänestetty...");
      return "";
    }

    return anecdotes[indexOfVoted];
  };

  if (pinnat[findIndexOfMostVoted()] === 0) {
    return (
      <div>
        <h2>anecdote with most votes</h2>
        <p>No notes so far</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>anecdote with most votes</h2>
        <p>{findMostVoted()}</p>
        <p>has {pinnat[findIndexOfMostVoted()]} votes</p>
      </div>
    );
  }
};

export default MostVotes;
