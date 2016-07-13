var ReactDOM = require('react-dom');
var React = require('react');
/*var SmartForm = require('../lib/SmartForm.js'); */
var SmartInput = require('../lib/fields/SmartInput.js'); 


var CommentBox = React.createClass({
  loadFieldsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadFieldsFromServer();
    setInterval(this.loadFieldsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

/*
var SmartFormPage = React.createClass({
  render: function(){
    return <SmartForm data = {this.props.data} />
  }
});
*/


var CommentList = React.createClass({
	render: function () {
		var commentItems = this.props.data.map(function (fields) {
			return (
				<Comment fieldItem = {fields} /> 
			);
		});

		return (
			<div className="commentList">
				{commentItems}
			</div>
		);
	}
});

var Comment = React.createClass({
  render: function() {
    var fieldSchema = this.props.fieldItem;
    if(fieldSchema.type==='string'){
      return <SmartInput  data = {this.fieldSchema} />
    }else{
      return (
      <div className="comment">
        <h2 className="commentAuthor">
          Test
        </h2>
      </div>
      );
    }
  }
});


ReactDOM.render(
  <CommentBox url="https://jsx-dev-react.herokuapp.com/form/FormFieldsNoAuth" pollInterval={2000} />,
  document.getElementById('content')
);