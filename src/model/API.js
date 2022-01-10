import axios from "axios";

import createFormData from "../utils/createFormData";
import apis from "../constant/apis";

class API {
  constructor(accesstoken) {
    this.accesstoken = accesstoken;
  }

  async sendRequest(requestType, data) {
    const { url } = apis[requestType];

    const bodyFormData = createFormData(data);

    const res = await axios({
      method: "post",
      url,
      data: bodyFormData,
      headers: { accesstoken: this.accesstoken },
    });
    console.log(bodyFormData);
    return res.data;
  }
}

export default API;
