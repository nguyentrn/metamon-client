const apis = {
  checkBag: {
    url: "https://metamon-api.radiocaca.com/usm-api/checkBag",
    method: "post",
  },
  getFightMonster: {
    url: "https://metamon-api.radiocaca.com/usm-api/getFightMonster",
    method: "post",
  },
  getNotify: {
    url: "https://metamon-api.radiocaca.com/usm-api/getNotify",
    method: "post",
  },
  getSetting: {
    url: "https://metamon-api.radiocaca.com/usm-api/getSetting",
    method: "post",
  },
  getWalletPropertyList: {
    url: "https://metamon-api.radiocaca.com/usm-api/getWalletPropertyList",
    method: "post",
  },
  login: {
    url: "https://metamon-api.radiocaca.com/usm-api/login",
    method: "post",
  },
  getBattelObjects: {
    url: "https://metamon-api.radiocaca.com/usm-api/getBattelObjects",
    method: "post",
    data: {
      address: "0x04d8ba1e71b967de73760967013969fb66a0ee8e",
      metamonId: 502119,
      front: 1,
    },
  },
  startPay: {
    url: "https://metamon-api.radiocaca.com/usm-api/startPay",
    method: "post",
    data: {
      address: "0x04D8BA1E71b967DE73760967013969fB66a0Ee8E",
      battleLevel: 1,
      monsterA: 502119,
      monsterB: 206072,
    },
  },

  startBattle: {
    url: "https://metamon-api.radiocaca.com/usm-api/startBattle",
    method: "post",
    data: {
      address: "0x04D8BA1E71b967DE73760967013969fB66a0Ee8E",
      monsterA: 502119,
      monsterB: 206072,
      battleLevel: 1,
    },
  },
};

export default apis;
