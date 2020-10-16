//class based component
//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // constructor(props){    //constructor
  //   super(props);
  //   this.state = {new: true};
  // }
  state = { showFormReview: false };     //component.state

  renderContent() {
    if (this.state.showFormReview ===  true) {
      return (<SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />);
    }
    //call back function( response to showFormReview is false or true) executed after the form is submitted.
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }


  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
