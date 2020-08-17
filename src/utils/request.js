import axios from "axios";

import ViewUI from "view-design";
import router from "@/router";
import i18n from "../il8n/index";
import { parseJWT } from "@/utils/index";

const service = axios.create({
  baseURL: "/"
});
let notAuthorization = ["/base_setting/sys_user/login"];
service.interceptors.request.use(
  request => {
    if (
      localStorage.getItem("gamecenterToken") &&
      notAuthorization.indexOf(request.url) === -1
    ) {
      request.headers["Authorization"] = localStorage.getItem(
        "gamecenterToken"
      );
    }
    if (request.url.includes("startHttpRequest")) {
      request.data = {};
      request.data.url = `http://${request.param}:12345/api/GetGameList`;
      request.data.method = `GET`;
      request.data.param = null;
      return request;
    }

    if (request.data && localStorage.getItem("gamecenterToken")) {
      let user = parseJWT(localStorage.getItem("gamecenterToken"));
      request.data["operator"] = user ? user.user_name : "";
    }
    return request;
  },

  error => {
    return error;
  }
);
// response interceptor
service.interceptors.response.use(
  response => {
    if (!response.data.ok) {
      return Promise.reject(response);
    } else {
      if (response.data.token) {
        localStorage.setItem("gamecenterToken", response.data.token);
      }
      return response;
    }
  },

  error => {
    if (error.request && error.request.status === 401) {
      ViewUI.Modal.warning({
        title: i18n.t("Message"),
        content: "登录超时，请重新登录",
        onOk: () => {
          router.push("/User/login");
        }
      });
    } else if (error.request && error.request.status === 500) {
      ViewUI.Modal.warning({
        title: i18n.t("Message"),
        content: "500",
        onOk: () => {
          router.go(-1);
        }
      });
    } else if (error.request && error.request.status === 403) {
      ViewUI.Modal.warning({
        title: i18n.t("Message"),
        content: "登录超时，请重新登录",
        onOk: () => {
          router.push("/User/login");
        }
      });
    }
  }
);

export default service;
