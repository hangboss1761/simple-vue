/**
 *根据路径从对象中获取值
 * @param {object} obj 目标对象
 * @param {string} expr 路径
 * @returns {*}
 */
export const getObjVal = (obj = {}, expr) => {
  let keyArr = expr.replace(/\s/g, "").split(".");

  return keyArr.reduce((acc, cur) => {
    return acc[cur];
  }, obj);
};

/**
 * 将传入的value设置到obj指定的属性上
 * @param {object} obj 目标对象
 * @param {string} expr 路径
 * @param {*} value 需要写入的值
 * @returns {object} obj
 */
export const setObjVal = (obj = {}, expr, value) => {
  let keyArr = expr.replace(/\s/g, "").split(".");

  keyArr.reduce((acc, cur, idx) => {
    if (idx === keyArr.length - 1) {
      acc[cur] = value;
    }
    return acc[cur];
  }, obj);

  return obj;
};

export const proxy2Vm = (vm, originObj) => {
  if (!originObj) {
    return;
  }

  Object.keys(originObj).forEach((key) => {
    Object.defineProperty(vm, key, {
      get () {
        return originObj[key];
      },
      set (val) {
        originObj[key] = val;
      }
    })
  })
};