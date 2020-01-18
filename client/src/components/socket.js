import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Socks extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
  }

  isPainting = false;

  userStrokeStyle = "#EE92C2";
  line = [];

  prevPos = { offsetX: 0, offsetY: 0 };

  socket = socketIOClient("http://127.0.0.1:1234");

  componentDidMount() {
    // Here we set up the properties of the canvas element.

    let ctx = this.refs.canvas.getContext("2d");

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    this.socket.on("initialize", data => {
      data.moves.map(point =>
        this.paint(point.start, point.stop, this.userStrokeStyle)
      );
    });

    this.socket.on("newDrawingData", data => {
      console.log(data);
      this.paint(data.start, data.stop, this.userStrokeStyle);
    });
  }

  onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
    this.paint(this.prevPos, this.prevPos, this.userStrokeStyle);
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting) {
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
    console.log(this.state.response);
    return (
      <div>
        {/* {this.state.response.start} */}
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
