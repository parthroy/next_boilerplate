function store_data(data: any, key: any) {
  if (!window.localStorage || !window.JSON || !key) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

function get_data(key: any) {
  if (!window.localStorage || !window.JSON || !key) {
    return;
  }
  var item = localStorage.getItem(key);

  if (!item) {
    return;
  }

  return JSON.parse(item);
}

function remove_data(key: any) {
  if (!window.localStorage || !window.JSON || !key) {
    return;
  }
  localStorage.removeItem(key);
}

export { store_data, get_data, remove_data };
