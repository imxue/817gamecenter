import request from "../utils/request";

export const login = param => {
  return request({
    url: "/base_setting/sys_user/login",
    method: "post",
    data: param
  });
};

export const changePassword = param => {
  return request({
    url: "/base_setting/sys_user/changePassword",
    method: "post",
    data: param
  });
};

// 获取用户角色
export const getSysUserRole = () => {
  return request({
    url: "/base_setting/sys_user_role/getall",
    method: "get"
  });
};

// 获取角色
export const getsysRole = () => {
  return request({
    url: "/base_setting/sys_role/getall",
    method: "get"
  });
};

// 获取用户
export const getSysUser = () => {
  return request({
    url: "/base_setting/sys_user/getall",
    method: "get"
  });
};
