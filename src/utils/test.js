import { parseJWT } from "@/utils/index";
import router from "../router/index";
function main() {
  let token = localStorage.getItem("gamecenterToken");
  if (token) {
    let resp = parseJWT(token);
    if (Math.round(new Date() / 1000) - resp.exp > 0) {
      router.push("/User");
      localStorage.removeItem("gamecenterToken");
    } else {
      router.push("/");
    }
  } else {
    router.push("/User");
  }
}
main();
