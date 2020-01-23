import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Timer from "./Timer";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import TextInput from "./TextInput.js";
import GameOver from "../layout/GameOver";

const divStyle = {
  display: "flex",
  alignItems: "center"
};

class CanvasContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStrokeStyle: "#FFFFFF",
      response: false,
      turn: false,
      seconds: 0,
      startOfTurn: 0,
      drawing: false,
      currWord: "",
      users: [],
      correct: false,
      open: false,
      score: 0,
      gameOver: false,
      words: [],
      rounds: 0
    };
  }

  isPainting = false;

  line = [];

  prevPos = { offsetX: 0, offsetY: 0 };

  prevPos = { offsetX: 0, offsetY: 0 };
  socket = socketIOClient("http://127.0.0.1:1234");

  componentDidMount() {
    // Here we set up the properties of the canvas element.

    let ctx = this.refs.canvas.getContext("2d");

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    this.socket.emit("token", localStorage.getItem("jwtToken"));

    this.socket.on("initialize", data => {
      data.moves.map(point =>
        this.paint(point.start, point.stop, point.userStrokeStyle)
      );

      this.setState(
        {
          users: data.users
        },
        () => console.log(this.state.users)
      );
    });

    this.socket.on("turn", data => {
      this.setState({ turn: true, currWord: data });

      let canvas = this.refs.canvas;

      if (canvas !== undefined) {
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 5;
      }
    });

    if (!this.state.turn) {
      this.socket.on("newDrawingData", data => {
        this.paint(data.start, data.stop, data.userStrokeStyle, data.lineWidth);
      });
    }

    this.socket.on("endTurn", data => {
      console.log("ended turn");
      this.setState({ turn: false, drawing: false });
      this.socket.emit("changedTurn");
    });

    this.socket.on("changedTurn", data => {
      console.log("changed turn");
      this.setState({
        turn: false,
        correct: false,
        open: false,
        words: [],
        rounds: data
      });

      let canvas = this.refs.canvas;

      if (canvas !== undefined) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      }
    });

    this.socket.on("gameOver", () => {
      this.setState({
        gameOver: true
      });
    });

    this.socket.on("guessWord", data => {
      this.setState({
        correct: true,
        open: true,
        score: data
      });
    });

    this.socket.on("updateUsers", data => {
      this.setState({
        users: data
      });
    });

    this.socket.on("updateTime", data => {
      this.setState({
        seconds: data.time,
        rounds: data.rounds
      });
    });
  }

  getColor = () => {
    return this.state.userStrokeStyle;
  };

  changeColor = e => {
    //on change requires an event parameter in order to collect the change in value for the color
    this.setState({
      userStrokeStyle: e.target.value //saying set key color to point to the targets value which is the selected option
    });
  };

  getThickness = () => {
    return this.state.lineWidth;
  };

  changeThickness = e => {
    //on change requires an event parameter in order to collect the change in value for the color
    let ctx = this.refs.canvas.getContext("2d");

    ctx.lineWidth = e.target.value;
  };

  onMouseDown = ({ nativeEvent }) => {
    if (this.state.turn && this.state.drawing) {
      const { offsetX, offsetY } = nativeEvent;
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
      this.paint(this.prevPos, this.prevPos, this.state.userStrokeStyle);
    }
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting && this.state.turn && this.state.drawing) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData }
      };

      // give socket new drawn data
      this.socket.emit("newPositionData", {
        ...positionData,
        userStrokeStyle: this.state.userStrokeStyle,
        lineWidth: this.refs.canvas.getContext("2d").lineWidth
      });
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.state.userStrokeStyle);
    }
  };

  paint = (prevPos, currPos, strokeStyle, lineWidth) => {
    let ctx = this.refs.canvas.getContext("2d");
    ctx.lineWidth = lineWidth === undefined ? ctx.lineWidth : lineWidth;

    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  };

  endPaintEvent = () => {
    if (this.isPainting) {
      this.isPainting = false;
    }
  };

  startDrawing = () => {
    if (this.state.turn && this.state.seconds <= 0) {
      this.socket.emit("startDrawing");
      this.setState({ drawing: true });
    }
  };

  addWord = currWord => {
    this.setState({
      words: [...this.state.words, currWord]
    });
  };

  determineGameDisplay = () => {
    let titleDisplay = this.determineDisplay();
    let userDisplay = this.determineUserDisplay();

    if (this.state.gameOver) {
      return <GameOver users={this.state.users}></GameOver>;
    } else {
      return (
        <div>
          <h1>Round: {this.state.rounds + 1}</h1>
          {titleDisplay}
          {userDisplay}
          <Timer seconds={this.state.seconds} />
          <div className="buttonalignment">
            <div className="search">
              <FormControl>
                <InputLabel>Colors</InputLabel>
                <NativeSelect onChange={this.changeColor} defaultValue="gray">
                  <option value="white">White</option>
                  <option value="gray">Gray</option>
                  <option value="black">Black</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="orange">Orange</option>
                  <option value="pink">Pink</option>
                </NativeSelect>
              </FormControl>
            </div>
            <div className="search">
              <FormControl>
                <InputLabel>Pen Size</InputLabel>
                <NativeSelect onChange={this.changeThickness} defaultValue={5}>
                  <option value={2}>Thin</option>
                  <option value={5}>Medium</option>
                  <option value={15}>Thick</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>
          <div>
            <Button
              onClick={this.startDrawing}
              variant="contained"
              color="primary"
              disabled={!this.state.turn}
            >
              Start Drawing
            </Button>
          </div>
          <br></br>
          <div style={divStyle}>
            <canvas
              style={{
                background: "gray",
                marginRight: "3%"
              }}
              onMouseDown={this.onMouseDown}
              onMouseLeave={this.endPaintEvent}
              onMouseUp={this.endPaintEvent}
              onMouseMove={this.onMouseMove}
              ref="canvas"
              width={1150}
              height={600}
            />
            <TextInput
              correct={this.state.correct}
              open={this.state.open}
              score={this.state.score}
              turn={this.state.turn}
              socket={this.socket}
              words={this.state.words}
              addWord={this.addWord}
            />
          </div>
        </div>
      );
    }
  };

  determineDisplay = () => {
    if (this.state.turn) {
      return (
        <div>
          <h1>It's your turn.</h1>
          <h1>Your word is: {this.state.currWord}</h1>
        </div>
      );
    } else {
      return <div>Wait for your turn...</div>;
    }
  };

  determineUserDisplay = () => {
    return this.state.users.map(elem => {
      return (
        <p>
          {elem.username}: {elem.score}
        </p>
      );
    });
  };

  render() {
    let gameDisplay = this.determineGameDisplay();

    return <div>{gameDisplay}</div>;
  }
}

export default CanvasContainer;
