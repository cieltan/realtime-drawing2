import React, { Component } from "react";

export default class Timer extends Component {
  state = {
    seconds: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        seconds: this.props.seconds
      });
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        {seconds === 0 ? (
          <h1>Time's Out!</h1>
        ) : (
          <h1>
            Time Remaining: {seconds < 10 ? `0${seconds}` : seconds} Seconds
          </h1>
        )}
      </div>
    );
  }
}
