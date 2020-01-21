import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Timer from "./Timer";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import TextInput from "./TextInput.js";

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
      currWord: ""
    };
  }

  isPainting = false;

  line = [];

  prevPos = { offsetX: 0, offsetY: 0 };

  prevPos = { offsetX: 0, offsetY: 0 };
  socket = socketIOClient("http://127.0.0.1:1234");

  guessWord = (word) => {
    this.socket.emit("guessWord", word)
  }
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
    });

    this.socket.on("turn", data => {
      console.log("turn");
      let ctx = this.refs.canvas.getContext("2d");
      ctx.lineWidth = 5;
      this.setState({ turn: true, currWord: data });
      console.log(data);
    });

    if (!this.state.turn) {
      this.socket.on("newDrawingData", data => {
        console.log(data);
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
      this.setState({ turn: false });
      let ctx = this.refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    });

    this.socket.on("updateTime", data => {
      this.setState({
        seconds: data
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

  determineDisplay = () => {
    if (this.state.turn) {
      return (
        <div>
          <h1>It's your turn.</h1>
          <p>Your word is: {this.state.currWord}</p>
        </div>
      );
    } else {
      return <div>Wait for your turn...</div>;
    }
  };

  render() {
    let titleDisplay = this.determineDisplay();

    return (
      <div>
        {titleDisplay}
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
          >
            Start Drawing
          </Button>
        </div>
        <br></br>
        <div style={divStyle}>
          <canvas
            style={{
              background: "gray",
              paddingRight: "30%",
              marginRight: "3%"
            }}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.endPaintEvent}
            onMouseUp={this.endPaintEvent}
            onMouseMove={this.onMouseMove}
            ref="canvas"
            width={950}
            height={600}
          />
          <TextInput guessWord={this.guessWord}/>
        </div>
      </div>
    );
  }
}

export default CanvasContainer;
