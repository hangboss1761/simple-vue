export const isTypeof = (data, type) => {
  return Object.prototype.toString.call(data) === type;
};

export const isFunction = data => {
  return isTypeof(data, '[object Function]');
};

export const isObject = data => {
  return isTypeof(data, '[object Object]');
};
