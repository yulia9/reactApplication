export const FETCH_STATES = {
  FETCH_BEGIN: 'FETCH_BEGIN',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
};

export const DATA_UPDATES = {
  DATA_UPDATE: 'DATA_UPDATE',
  DATA_SORT: 'DATA_SORT',
  DATA_FILTER: 'DATA_FILTER',
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
      .then(response => response.json())
      .then(response => {
        dispatch(fetchSuccess(response.data));
        return response.data;
      })
      .catch(error => dispatch(fetchFailure(error)));
  }
}

export function updateData(data) {
  return function (dispatch) {
    dispatch({
      type: DATA_UPDATES.DATA_UPDATE,
      data: data
    })
  }
}

export function filterData(data, filterBy, searchText) {
  let arr;
  let filterOpts = {
    title: 'title',
    genre: 'genre'
  };

  if (filterBy === filterOpts.title) {
    arr = data.filter(n => {
      return n.title.toLowerCase().indexOf(searchText) > -1;
    })
  } else if (filterBy === filterOpts.genre) {
    arr = data.filter(n => {
      let genres = n.genres.filter(g =>
        g.toLowerCase().indexOf(searchText) > -1);
      return genres.length > 0;
    })
  }

  return function (dispatch) {
    dispatch({
      type: DATA_UPDATES.DATA_FILTER,
      data: arr
    })
  }
}

