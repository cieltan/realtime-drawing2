import React, { Component } from "react";
import CanvasContainer from "./CanvasContainer.js";


class GameView extends Component {
  render() {
    return (
      <div className="game">
        <div className="gamealign"></div>
        <div className="alignment">
          <div className="paper">
            <CanvasContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default GameView;
