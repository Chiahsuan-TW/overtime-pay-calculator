import axios from "axios";
// import store from "../store";

const APIService = {
  post(postData) {
    const formdata = getFormData(postData);
    console.log("收到的資料", postData, "formdata", formdata);

    var config = {
      method: "post",
      url: "https://script.google.com/macros/s/AKfycbzTlb2NJiJdo-YcJC8qzR6SgUgfpX3dgKEj1mzmPRdTARKkfCf7yfZe1pblSN5FKqlG/exec",
      headers: {
        Cookie: "__Host-GAPS=1:muOSw6pnTNXAGQWghQm2wJU55NVsIw:qTEqmUJM5Th6xjpn",
        // ...formdata.getHeaders(),
      },
      data: formdata,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

export default APIService;

// const api = axios.create({
//   baseURL:
//     "https://script.google.com/macros/s/AKfycbzTlb2NJiJdo-YcJC8qzR6SgUgfpX3dgKEj1mzmPRdTARKkfCf7yfZe1pblSN5FKqlG/exec",
// });

// const api = axios.create({
//   baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
//   header: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     // config.headers["Authorization"] = getAuthorizationHeader();
//     config.headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       ...getAuthorizationHeader(),
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default {
//   getScenicSpotData() {
//     return api.get("ScenicSpot?%24format=JSON");
//   },
//   getDetailData(id) {
//     return api.get(
//       `ScenicSpot?%24filter=contains(ScenicSpotID%2C'${id}')&%24format=JSON`
//     );
//   },
//   getSearchData(keyword) {
//     return api.get(
//       `ScenicSpot?%24filter=contains(DescriptionDetail,'${keyword}')&%24format=JSON`
//     );
//   },
// };

// function getAuthorizationHeader() {
//   let AppID = "12efae2e62544e008e3edb1edfc82542";
//   let AppKey = "SLIpweeVUHAwlA3-4jmwbHH0ryg";
//   let GMTString = new Date().toGMTString();
//   let ShaObj = new jsSHA("SHA-1", "TEXT");
//   ShaObj.setHMACKey(AppKey, "TEXT");
//   ShaObj.update("x-date: " + GMTString);
//   let HMAC = ShaObj.getHMAC("B64");
//   const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
//   return { Authorization: Authorization, "X-Date": GMTString };
// }
