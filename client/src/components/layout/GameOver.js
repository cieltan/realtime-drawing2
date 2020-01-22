import React from "react";

export default function GameOver(props) {
  const determineUserDisplay = () => {
    return props.users.map(elem => {
      return (
        <p>
          {elem.username}: {elem.score}
        </p>
      );
    });
  };
  return <div>{determineUserDisplay()}</div>;
}
