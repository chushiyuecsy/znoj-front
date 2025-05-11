import CryptoJS from "crypto-js";

// MD5 加密函数
export const encryptPassword = (plainText: string): string => {
  return CryptoJS.MD5(plainText).toString();
};
