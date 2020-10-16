// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
//import action object and then wire up to our component with connect helper
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
//代替4个<div></div>                       //fields.name and fields.label
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });


  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}
//用connect一定要用mapStateToProps
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
