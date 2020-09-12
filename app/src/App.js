import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Questions from './components/Questions';
import Home from './components/Home';
import './styles.css';
import ShowQuestion from './components/ShowQuestion';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/questions" component={props => <Questions key={Date.now()} {...props} />} />
            <Route path="/id/:id" component={ShowQuestion} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
