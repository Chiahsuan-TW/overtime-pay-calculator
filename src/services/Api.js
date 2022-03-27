import axios from "axios";

// const api = axios.create({
//   baseURL: "https://script.google.com/macros/s/",
// });
// export default function getGoogleSheetData() {
//   return api.get("AKfycbzIEThR60wFbKhk6Re0ClPk1kfQX_MelHiJG-0ncHjUSzyggviznfd3zyHfJgJEojGlCQ/exec");
// }

const api = {
  //到時給async await的await 所以要return promise物件
  getDataBase() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbzIEThR60wFbKhk6Re0ClPk1kfQX_MelHiJG-0ncHjUSzyggviznfd3zyHfJgJEojGlCQ/exec"
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default api;
