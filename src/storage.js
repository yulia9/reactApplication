
export let storage = {
  set (data, localStorageId) {
    if (localStorageId) {
      window.localStorage.setItem(localStorageId, JSON.stringify(data));
    }
  },
  get (storageId) {
  	let data = [];
    if (window.localStorage && window.localStorage[storageId]) {
      data = JSON.parse(window.localStorage[storageId]);
    }
    return data;
  }
};