export function isSafariBrowser() {
  var userAgent = navigator.userAgent;

  // 检查是否包含 Safari 的标识字符串
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
}
