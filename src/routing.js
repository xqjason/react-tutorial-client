var ReactDOM = require('react-dom');
var React = require('react');
var Router, Route, browserHistory = require('react-router');

var Login = require('./login');
var FormBox = require ('./tutorial2');

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="login" component={Login}/>
    <Route path="form" component={FormBox}/>
  </Router>,
  document.getElementById('app')
)
