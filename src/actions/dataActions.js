import { storage } from '../storage';

export const DATA_UPDATES = {
  DATA_UPDATE: 'DATA_UPDATE',
  DATA_SORT: 'DATA_SORT',
  DATA_FILTER: 'DATA_FILTER',
  UPDATE_MOVIE: 'UPDATE_MOVIE'
};

export function updateData(data) {

  return {
  	type: DATA_UPDATES.DATA_UPDATE,
    data: data,
  }
}

export function updateMovie(movie) {

  return {
    type: DATA_UPDATES.UPDATE_MOVIE,
    movie: movie,
  }
}

export function filterData(data, filterBy, searchText) {
  let arr = data;
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
  return {
  	type: DATA_UPDATES.DATA_FILTER,
    data: arr
  }
}

export function sortData(data, sortBy) {
  let arr = data.sort((a, b) => {
  	return b[sortBy] - a[sortBy];	
  })

  return updateData(arr);
}
