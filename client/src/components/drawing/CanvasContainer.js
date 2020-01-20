import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

class CanvasContainer extends Component {
    constructor(props){
        super(props);{
            this.state ={
                userStrokeStyle: '#FFFFFF',
                lineWidth: 5
        };

        }
    }

    isPainting = false;

    // userStrokeStyle = '#EE92C2';
    line = [];
    
    prevPos = { offsetX: 0, offsetY: 0 };


    componentDidMount() {
        // Here we set up the properties of the canvas element. 

        let ctx = this.refs.canvas.getContext('2d');
    
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.state.lineWidth;
    }

    getColor = () => {
        return this.state.userStrokeStyle;
    }


    changeColor = e => { //on change requires an event parameter in order to collect the change in value for the color
        this.setState({
            userStrokeStyle: e.target.value //saying set key color to point to the targets value which is the selected option
        })
    }

    getThickness = () => {
        return this.state.lineWidth;
    }


    changeThickness = (e) => { //on change requires an event parameter in order to collect the change in value for the color
        let ctx = this.refs.canvas.getContext('2d');
    
        ctx.lineWidth = e.target.value;
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
          this.paint(this.prevPos, offSetData, this.state.userStrokeStyle);
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
            <div>
            <div className="buttonalignment">
            <div className="search">
            <select name="color" onChange={this.changeColor}>
                        <option value="white" select>White</option>
                        <option value="black" select>Black</option>
						<option value="blue" select>Blue</option>
						<option value="purple" select>Purple</option>
						<option value="green" select>Green</option>
                        <option value="yellow" select>Yellow</option>
                        <option value="orange" select>Orange</option>
						<option value="pink" select>Pink</option>
			</select>
            </div>
            <div className="search">
                <select name="thickness"  onChange={this.changeThickness}>
						<option value={2} select>Thin</option>
						<option value={5} select>Medium</option>
						<option value={15} select>Thick</option>
				</select>
            </div>
            </div>
            <canvas 
                style={{ background: 'gray' }}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.endPaintEvent}
                onMouseUp={this.endPaintEvent}
                onMouseMove={this.onMouseMove}
                lineWidth={this.state.lineWidth}
                ref="canvas" 
                width={775} 
                height={550}
            />
            </div>
        );
    }
}

export default CanvasContainer