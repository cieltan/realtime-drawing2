import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Timer from "./Timer";

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        userStrokeStyle: "#FFFFFF",
        lineWidth: 5,
        response: false,
        turn: false,
        seconds: 0,
        startOfTurn: 0
      };
    }
  }

  isPainting = false;

  // userStrokeStyle = '#EE92C2';
  line = [];

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

      if (data.startOfTurn !== undefined) {
        this.setState({
          seconds: 30 - (Math.floor(Date.now() / 1000) - data.startOfTurn)
        });
      }

      console.log(data.startOfTurn);
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
    this.socket.on("changedTurn", data => {
      console.log("changed turn");
      this.setState({ turn: false });
      let ctx = this.refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    });

    this.socket.on("startDrawing", data => {
      console.log(Math.floor(Date.now() / 1000));
      console.log(data.startOfTurn);
      this.setState({
        seconds: 30 - (Math.floor(Date.now() / 1000) - data.startOfTurn)
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
    if (this.isPainting && this.state.turn) {
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
    }
  };

  render() {
    return (
      <div>
        {this.state.seconds}
        <Timer seconds={this.state.seconds} />
        <div className="buttonalignment">
          <div className="search">
            <select
              name="color"
              class="color-change"
              onChange={this.changeColor}
            >
              <option value="white" select>
                White
              </option>
              <option value="black" select>
                Black
              </option>
              <option value="blue" select>
                Blue
              </option>
              <option value="purple" select>
                Purple
              </option>
              <option value="green" select>
                Green
              </option>
              <option value="pink" select>
                Pink
              </option>
            </select>
          </div>
          <div className="search">
            <select
              name="thickness"
              class="line-change"
              onChange={this.changeThickness}
            >
              <option value={2} select>
                Thin
              </option>
              <option value={5} select>
                Medium
              </option>
              <option value={15} select>
                Thick
              </option>
            </select>
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
          width={600}
          height={400}
        />
      </div>
    );
  }
}

export default CanvasContainer;
