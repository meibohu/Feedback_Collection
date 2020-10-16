import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//action creator
// export const fetchUser = () =>
////Whenver the action creator is called, it will return function. Redux thunk will see that we return to function and it will
////automatically call it with dispatch. We then make a request, wait until get the response, dispatch the action
  //  function(dispatch) {
  //   // const request = axios.get('/api/current_user');    //relative path using proxy in development env.
  //   axios.get('/api/current_user')    //relative path using proxy in development env.
  //     .then(res => dispatch({ type: FETCH_USER, payload: res}));
  // }
// };

//return a function, make request, after request is completed do we dispatch an action.
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')    //relative path using proxy in development env.
    dispatch({ type: FETCH_USER, payload: res.data});   //just return res.data
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);    //send out
  dispatch({ type: FETCH_USER, payload: res.data});   //update value in reducer(payload), then Header.js return API.
};

//new action creator:
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');    //redirect to survey
  dispatch({ type: FETCH_USER, payload: res.data });
};

//pass no argument, we need all the surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
