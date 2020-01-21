import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Timer from "./Timer";

class CanvasContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStrokeStyle: "#FFFFFF",
      lineWidth: 5,
      response: false,
      turn: false,
      seconds: 0,
      startOfTurn: 0,
      drawing: false
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
    ctx.lineWidth = this.state.lineWidth;

    this.socket.emit("token", localStorage.getItem("jwtToken"));

    this.socket.on("initialize", data => {
      data.moves.map(point =>
        this.paint(point.start, point.stop, point.userStrokeStyle)
      );
    });

    this.socket.on("turn", data => {
      console.log("turn");
      this.setState({ turn: true });
    });

    if (!this.state.turn) {
      this.socket.on("newDrawingData", data => {
        console.log(data);
        this.paint(data.start, data.stop, data.userStrokeStyle);
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
    if (this.state.turn) {
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
        userStrokeStyle: this.state.userStrokeStyle
      });
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.state.userStrokeStyle);
    }
  };

  paint = (prevPos, currPos, strokeStyle) => {
    let ctx = this.refs.canvas.getContext("2d");

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

  render() {
    return (
      <div>
        {this.state.seconds}
        <Timer seconds={this.state.seconds} />
        <div className="buttonalignment">
          <div className="search">
            <FormControl variant="filled" className="buttons">
              <InputLabel id="demo-simple-select-filled-label">
                Colors
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={this.changeColor}
              >
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="purple">Purple</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="orange">Orange</MenuItem>
                <MenuItem value="pink">Pink</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="search">
            <FormControl variant="filled" className="buttons">
              <InputLabel id="demo-simple-select-filled-label">
                Pen Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={this.changeThickness}
              >
                <MenuItem value={2}>Thin</MenuItem>
                <MenuItem value={5}>Medium</MenuItem>
                <MenuItem value={15}>Thick</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <button onClick={this.startDrawing}>Start Drawing</button>
        <canvas
          style={{ background: "gray" }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
          lineWidth={this.state.lineWidth}
          ref="canvas"
          width={950}
          height={600}
        />
      </div>
    );
  }
}

export default CanvasContainer;
