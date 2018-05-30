let storageId = 'movies';

export let storage = {
  set (data) {
    window.localStorage.setItem(storageId, JSON.stringify(data));
  },
  get () {
  	let data = [];
    if (window.localStorage && window.localStorage[storageId]) {
      data =  JSON.parse(window.localStorage[storageId]);
    }
    return data;
  }
};