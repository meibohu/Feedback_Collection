//import reducers directory
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';    //rename to reduxForm
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';


export default combineReducers({
  auth: authReducer,    //assign to key
  form: reduxForm,
  surveys: surveysReducer
});
