/**
 * 权限检查
 * @param now 当前用户
 * @param need 需要的权限
 */
import ACCESS_ENUM from "@/access/accessEnum";

const checkAccess = (now: any, need = ACCESS_ENUM.GUEST) => {
  const nowAccess = now?.userRole ?? ACCESS_ENUM.GUEST;
  if (need === ACCESS_ENUM.GUEST) {
    return true;
  }
  return !(
    (need === ACCESS_ENUM.USER && nowAccess === ACCESS_ENUM.GUEST) ||
    (need === ACCESS_ENUM.TEACHER &&
      (nowAccess === ACCESS_ENUM.GUEST || nowAccess === ACCESS_ENUM.USER)) ||
    (need === ACCESS_ENUM.ADMIN && nowAccess !== ACCESS_ENUM.ADMIN)
  );
};

export default checkAccess;
