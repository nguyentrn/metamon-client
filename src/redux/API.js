import axios from 'axios';

import apis from '../constant/apis';

class API {
  constructor(accesstoken) {
    this.accesstoken = accesstoken;
  }

  async sendRequest(requestType, data) {
    const { url } = apis[requestType];
    const bodyFormData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      bodyFormData.append(key, val);
    });

    const res = await axios({
      method: 'post',
      url,
      data: bodyFormData,
      headers: { accesstoken: this.accesstoken },
    });
    return res.data;
  }
}

export default API;
