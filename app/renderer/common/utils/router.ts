/**
 * @description 判断是否属于外部链接
 * @param {string} url - 链接
 * @returns {boolean} 返回结果
 */
export const isHttpOrHttpsUrl = (url: string): boolean => {
  let regRule = /(http|https):\/\/([\w.]+\/?)\S*/;
  return regRule.test(url.toLowerCase());
};
