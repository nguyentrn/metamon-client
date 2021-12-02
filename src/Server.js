import axios from "axios";

class Server {
  constructor(address, sign) {
    this.hostname = "http://lenthiendang.com:6161";
    this.address = address;
    this.sign = sign;
  }

  async checkUser() {
    const res = await axios.post(`${this.hostname}/api/v1/user/check`, {
      address: this.address,
      sign: this.sign,
    });
    return res.data;
  }
}

export default Server;
