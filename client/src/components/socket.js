import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Socks extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      turn: false
    };
  }

  isPainting = false;

  userStrokeStyle = "#EE92C2";
  line = [];

  prevPos = { offsetX: 0, offsetY: 0 };

  socket = socketIOClient("http://127.0.0.1:1234");

  componentDidMount() {
    //

    // Here we set up the properties of the canvas element.

    let ctx = this.refs.canvas.getContext("2d");

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    this.socket.emit("token", localStorage.getItem("jwtToken"));

    this.socket.on("initialize", data => {
      data.moves.map(point =>
        this.paint(point.start, point.stop, this.userStrokeStyle)
      );
    });

    this.socket.on("turn", data => {
      console.log("turn");
      this.setState({ turn: true });
    });

    if (!this.state.turn) {
      this.socket.on("newDrawingData", data => {
        console.log(data);
        this.paint(data.start, data.stop, this.userStrokeStyle);
      });
    }
    this.socket.on("changedTurn", data => {
      console.log("changed turn");
      this.setState({ turn: false });
      let ctx = this.refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    });
  }

  onMouseDown = ({ nativeEvent }) => {
    if (this.state.turn) {
      const { offsetX, offsetY } = nativeEvent;
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
      this.paint(this.prevPos, this.prevPos, this.userStrokeStyle);
    }
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting && this.state.turn) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData }
      };

      // give socket new drawn data
      this.socket.emit("newPositionData", positionData);
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
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

  render() {
    console.log(this.state.turn);
    return (
      <div>
        <canvas
          style={{ background: "gray" }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
          ref="canvas"
          width={1000}
          height={600}
        />
      </div>
    );
  }
}

export default Socks;
