
/**
 *根据路径从对象中获取值
 * @param {object} obj 目标对象
 * @param {string} expr 路径
 */
export const getObjVal = (obj = {}, expr) => {
  let keyArr = expr.replace(/\s/g, '').split('.');

  return keyArr.reduce((acc, cur) => {
    return acc[cur];
  }, obj);
}