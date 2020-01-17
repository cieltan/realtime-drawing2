import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Router>
                        <div className="App">
                            <Switch>
                                <Route exact path="/" component={Register} />
                                <Route exact path="/dashboard" component={Dashboard} />
                            </Switch>
                        </div>
                    </Router>
            </Provider>
          );
    }

}

export default App;
