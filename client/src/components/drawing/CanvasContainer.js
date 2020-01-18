import React, { Component } from 'react'

class CanvasContainer extends Component {

    isPainting = false;

    userStrokeStyle = '#EE92C2';
    line = [];
    
    prevPos = { offsetX: 0, offsetY: 0 };


    componentDidMount() {
        // Here we set up the properties of the canvas element. 

        let ctx = this.refs.canvas.getContext('2d');
    
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
    }

    onMouseDown = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
        this.paint(this.prevPos, this.prevPos, this.userStrokeStyle)
    }

    onMouseMove = ({ nativeEvent }) =>  {
        if (this.isPainting) {
          const { offsetX, offsetY } = nativeEvent;
          const offSetData = { offsetX, offsetY };
          // Set the start and stop position of the paint event.
          const positionData = {
            start: { ...this.prevPos },
            stop: { ...offSetData },
          };
          // Add the position to the line array
          console.log(positionData);
          this.line = this.line.concat(positionData);
          this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
    }

    paint = (prevPos, currPos, strokeStyle) =>  {

        let ctx = this.refs.canvas.getContext('2d');

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
    }

    endPaintEvent = () => {
        if(this.isPainting) {
            this.isPainting= false;
        }
    }

    render() {
        return (
            <canvas 
                style={{ background: 'gray' }}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.endPaintEvent}
                onMouseUp={this.endPaintEvent}
                onMouseMove={this.onMouseMove}
                
                ref="canvas" 
                width={1000} 
                height={600}
            />
        );
    }
}

export default CanvasContainer