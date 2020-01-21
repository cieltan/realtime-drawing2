import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

    useStyles = makeStyles(theme => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));


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
            <FormControl variant="filled" className="buttons">
            <InputLabel id="demo-simple-select-filled-label">Colors</InputLabel>
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
            <InputLabel id="demo-simple-select-filled-label">Pen Size</InputLabel>
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
            <canvas 
                style={{ background: 'gray' }}
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

export default CanvasContainer