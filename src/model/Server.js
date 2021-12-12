import axios from "axios";

export class Server {
  constructor(address) {
    this.hostname = "http://lenthiendang.com:6161";
    // this.hostname = 'http://localhost:6161';
    this.address = address;
  }

  setAddress(address) {
    this.address = address;
  }

  async checkUser() {
    const res = await axios.post(`${this.hostname}/api/v1/user/check`, {
      address: this.address,
    });
    return res.data;
  }

  async insertMonster(monster) {
    await axios.post(`${this.hostname}/api/v1/monster/insertOne`, monster);
  }

  async getLastMonster(monster) {
    const lastMonster = await axios(
      `${this.hostname}/api/v1/monster/lastMonster`
    );
    return lastMonster.data.data;
  }
}

const server = new Server();
export default server;
