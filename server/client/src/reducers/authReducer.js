import{ FETCH_USER } from '../actions/types';
//create a reducer and immediately export it:
export default function(state = [], action){    //state is empty

  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
