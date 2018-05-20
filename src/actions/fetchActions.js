import { storage } from '../storage';

export const FETCH_STATES = {
  FETCH_BEGIN: 'FETCH_BEGIN',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
};

const fetchBegin = () => ({
  type: FETCH_STATES.FETCH_BEGIN,
  data: []
});

const fetchSuccess = data => ({
  type: FETCH_STATES.FETCH_SUCCESS,
  data: { data }
});

const fetchError = error => ({
  type: FETCH_STATES.FETCH_FAILURE,
  error: { error }
});

export function fetchData(url) {
  return function (dispatch) {
    dispatch(fetchBegin());
    return fetch(url)
      .then(response => {
        return response.json()})
      .then(response => {
        storage.set(response.data);
        dispatch(fetchSuccess(response.data));
        return response.data;
      })
      .catch(error => {
        storage.set([]);
        dispatch(fetchError(error))
      });
  }
}


