import axios from "axios";

export class Server {
  constructor(token) {
    this.hostname = "http://128.199.137.24:6161";
    // this.hostname = "http://localhost:6161";
    this.token = token;
  }

  getConfig() {
    return {
      headers: {
        authentication: `Bearer ${this.token}`,
      },
    };
  }

  setAddress(address) {
    this.address = address;
  }

  async checkUser() {
    const res = await axios(
      `${this.hostname}/api/v1/user/check`,
      this.getConfig()
    );
    return res.data;
  }

  async insertMonster(monster) {
    await axios.post(`${this.hostname}/api/v1/game/monster/insertOne`, monster);
  }

  async getLastMonster() {
    const lastMonster = await axios(
      `${this.hostname}/api/v1/game/monster/lastMonster`
    );
    return lastMonster.data.data;
  }

  async insertAddress(address) {
    await axios.post(
      `${this.hostname}/api/v1/game/address/insertOne`,
      address,
      this.getConfig()
    );
  }

  async removeAddress(addressId) {
    await axios.post(
      `${this.hostname}/api/v1/game/address/removeOne`,
      { addressId },
      this.getConfig()
    );
  }
}

export default Server;
