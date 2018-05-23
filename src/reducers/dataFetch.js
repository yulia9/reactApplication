import { DATA_UPDATES } from '../actions/dataActions';
import { FETCH_STATES } from '../actions/fetchActions';
import { storage } from '../storage';

const initialState = {
  data: storage.get(),
  loading: false,
  error: null
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATES.FETCH_BEGIN:
      return [
        ...state,
        {
          data: action.data,
          loading: true
        }
      ]
    case FETCH_STATES.FETCH_SUCCESS:
      return [
        ...state,
        {
          data: action.data,
          loading: false
        }
      ]
    case FETCH_STATES.FETCH_FAILURE:
      return [
        ...state,
        {
          error: action.error,
          warning: true
        }
      ]
    case DATA_UPDATES.DATA_UPDATE:
      return [
        ...state,
        {
          data: action.data,
          loading: false
        }
      ]
    case DATA_UPDATES.DATA_FILTER:
      return [
        ...state,
        {
          data: action.data,
          loading: false
        }
      ]
    default:
      return state
  }
}

export default data;