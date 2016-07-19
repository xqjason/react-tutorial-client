var ReactDOM = require('react-dom');
var React = require('react');
/*var SmartForm = require('../lib/SmartForm.js'); */
var SmartInput = require('../lib/fields/SmartInput.js'); 


var FormBox = React.createClass({
  loadFieldsFromServer: function() {
    $.ajax({
      url: "https://jsx-dev-react.herokuapp.com/form/FormFields",
      dataType: 'json',
      cache: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa("jd@test.com" + ":" + "abc123"));
      },
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
  },
  render: function() {
    return (
      <div className="FormBox">
        <FieldList data={this.state.data} />
      </div>
    );
  }
});


var FieldList = React.createClass({
	render: function () {
		var fieldItems = this.props.data.map(function (fields) {
			return (
				<FieldItem key ={fields._id} fieldItem = {fields} /> 
			);
		});

		return (
			<div className="FieldList">
				{fieldItems}
			</div>
		);
	}
});

var FieldItem = React.createClass({
  render: function() {
    if(this.props.fieldItem.type==='string'){
      return <SmartInput label={this.props.fieldItem.label} type={this.props.fieldItem.type}/>
    }else{
      return (
      <div className="xxxxxx">
        <h2 className="xxxxxxyyyyy">
          {this.props.fieldItem.label}
        </h2>
      </div>
      );
    }
  }
});

module.exports = FormBox;