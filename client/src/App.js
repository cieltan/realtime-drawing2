import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import GameView from './components/drawing/GameView';
import RegisterScreen from './components/drawing/RegisterScreen';
import LoginScreen from './components/drawing/LoginScreen'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <GameView />
        {/* <LoginScreen /> */}
      </div>
    );
  }
}

export default App;