import { axios } from "@/utils/request";

export function getBanner() {
  return axios({
    url: "/wx/api/index/advertisementList?position=index",
    method: "get"
  });
}