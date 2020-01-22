import React, { Component } from "react";
import CanvasContainer from "./CanvasContainer.js";
import TextInput from "./TextInput.js";
import Scroll from "./Scroll.js";

class GameView extends Component {
  render() {
    return (
      <div className="game">
        <div className="gamealign">
        </div>
        <div className="alignment">
          <div className="paper">
            <CanvasContainer />
          </div>
          <div className="paper2">
            <TextInput />
            <Scroll />
          </div>
        </div>
      </div>
    );
  }
}

export default GameView;
