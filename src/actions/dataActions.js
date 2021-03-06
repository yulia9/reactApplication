import { storage } from '../storage';

export const DATA_UPDATES = {
  DATA_UPDATE: 'DATA_UPDATE',
  DATA_SORT: 'DATA_SORT',
  DATA_FILTER: 'DATA_FILTER',
};

export function updateData(data, storageId) {
  storage.set(data, storageId);

  return {
  	type: DATA_UPDATES.DATA_UPDATE,
    data: data
  }
}

export function filterData(data, filterBy, searchText, storageId) {
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
  storage.set(data, storageId);
  return {
  	type: DATA_UPDATES.DATA_FILTER,
    data: arr
  }
}

export function sortData(data, sortBy, storageId) {
  let arr = data.sort((a, b) => {
  	return b[sortBy] - a[sortBy];	
  })

  return updateData(arr, storageId);
}
