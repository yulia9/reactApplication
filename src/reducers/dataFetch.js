import { DATA_UPDATES } from '../actions/dataActions';
import { FETCH_STATES } from '../actions/fetchActions';
import { storage } from '../storage';

const initialState = {
  data: [],
  loading: false,
  error: null,
  movie: ''
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATES.FETCH_BEGIN:
      return Object.assign({}, state, {
          data: [],
          loading: true,
          movie: ''
        })
      
    case FETCH_STATES.FETCH_SUCCESS:
      return Object.assign({}, state, {
          data: action.data,
          loading: false,
          movie: action.movie.data
        })
    case FETCH_STATES.FETCH_FAILURE:
      return Object.assign({}, state, {
          error: action.error,
          warning: true
        })
    case DATA_UPDATES.DATA_UPDATE:
      return Object.assign({}, state, {
          data: action.data,
          loading: false,
          movie: action.movie
        })
    case DATA_UPDATES.UPDATE_MOVIE:
      return Object.assign({}, state, {
          movie: action.movie
        })
    case DATA_UPDATES.DATA_FILTER:
      return Object.assign({}, state, {
          data: action.data,
          loading: false
        })
    default:
      return state
  }
}

export default data;
