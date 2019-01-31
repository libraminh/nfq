import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './components/Home'
import Search from './components/Search'
import VideoModal from './components/VideoModal'
import FormModal from './components/FormModal'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}  />
              <Route path="/nasa-search" component={Search} />
              <Route path="/video/:id" component={VideoModal} />
              <Route path="/edit/:id" component={FormModal} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
