import { FETCH_STATES, DATA_UPDATES } from '../actions';


const initialState = {
  data: [],
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
