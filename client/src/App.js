import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store"

class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Router>
                        <div className="App">
                            <Switch>
                                <Route exact path="/" component={Register} />
                            </Switch>
                        </div>
                    </Router>
            </Provider>
          );
    }

}

export default App;
