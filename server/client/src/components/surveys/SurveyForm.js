//class based component
//SurveyForm shows a form for a user to add input
import _ from 'lodash';    //map function
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';    //one functin we want
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validEmails from '../../utils/validateEmails';
import formFields from './formFields';

//not change label and name
// const FIELDS = [
//   { label: 'Survey Title', name: 'title' },
//   { label: 'Subject Line', name: 'subject' },
//   { label: 'Email Body', name: 'body' },
//   { label: 'Recipeient List', name: 'emails' },
// ]

class SurveyForm extends Component {

  //title: rather than component="input", rely upon us to do itself.
  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    });
    // return (
    //   <div>
    //     <Field
    //       label="Survey Title"
    //       type="text"
    //       name="title"
    //       component={SurveyField}
    //     />
    //   </div>
    // );
  }
  render() {        //pass arror function: to call another function after user submits form.
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validEmails(values.recipients || '');
  //for each loop:
  _.each(formFields, ({ name }) => {   //we only want name for each individual field
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  // if (!values.title) {    //repetitve
  //   errors.title = 'You must provide a title';
  // }
  // if(!values.subject){
  //   errors.subject = 'You must provide a subject';
  // }
  // if(!values.body){
  //   errors.body = 'You must provide a body';
  // }

  return errors;
}

//redux form helper: initialize and configure the survey
//customize how our form behaves, adding some properties like handleSubmit
export default reduxForm({
  // validate: validate    //function validate
  validate,     //ES6
  form: 'surveyForm',
  destroyOnUnmount: false,

})(SurveyForm);
