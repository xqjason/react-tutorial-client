/*var ReactDOM = require('react-dom');
var React = require('react');*/

/*
var CommentBox = React.createClass ({
	render: function() {
		return (
			<div className="commentBox">
				<CommentList data={this.props.abc} />
        		<CommentForm />
			</div>
		);
	}

});
*/

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
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
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

/*
var CommentList = React.createClass({
	render: function () {
		return (
			<div className="commentList">
       		 	<Comment author={this.props.data[0].author} > {this.props.data[0].text} </Comment>
        		<Comment author={this.props.data[1].author} > {this.props.data[1].text} </Comment>
      		</div>
		)
	}

});
*/

var CommentList = React.createClass({
	render: function () {
		var commentItems = this.props.data.map(function (comment) {
			return (
				<Comment author={comment.author} key={comment.id}> {comment.text} </Comment>
			);
		});

		return (
			<div className="commentList">
				{commentItems}
			</div>
		);
	}
});

/*
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    );
  }
});
*/

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="https://jsx-dev-react.herokuapp.com/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);