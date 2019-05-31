import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PostList from './components/PostList';
import PostEdit from './components/PostEdit';

class App extends Component {
  render() {
    return (
      <Container maxWidth="xs">
        <Router>
          <Switch>
            <Route path="/" exact={true} component={PostList}/>
            <Route path="/posts" exact={true} component={PostList}/>
            <Route path="/posts/:id" exact={true} component={PostEdit}/>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
