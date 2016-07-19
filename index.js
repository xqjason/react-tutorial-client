var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
/* var IndexRoute = ReactRouter.IndexRoute; */
var Link = ReactRouter.Link;

var LoginBox = require('./src/login.js');
var FormBox = require ('./src/form.js'); 

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <h1>This is the Home Page</h1>
        <ul role="nav">
          <li><Link to="/login">login</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={hashHistory}>    
    <Route path="/" component={Home}>
      <Route path="/login" component={LoginBox} />
      <Route path="/form" component={FormBox} />
    </Route>
  </Router>,
  document.getElementById('content')
);
