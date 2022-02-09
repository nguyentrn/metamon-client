import { createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Server from "../model/Server";
import sleep from "../utils/sleep";
import createFormData from "../utils/createFormData";
import API from "../model/API";
import { initUser } from "./authSlice";

const initialState = {
  address: undefined,
  monsters: undefined,
  items: undefined,
  battleInfo: undefined,
  total: 0,
  win: 0,
  isLoadingFighting: false,
  isLoadingGame: false,
  gameToken: undefined,
  gameErr: undefined,
};

export const dataSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setGameToken: (state, action) => {
      state.gameToken = action.payload;
    },
    setMonsters: (state, action) => {
      state.monsters = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setBattleInfo: (state, action) => {
      state.battleInfo = action.payload;
    },
    addTotalCount: (state) => {
      state.total += 1;
    },
    addWinCount: (state) => {
      state.win += 1;
    },
    setGameErr: (state, action) => {
      state.gameErr = action.payload;
    },
    toggleLoadingFighting: (state, action) => {
      state.isLoadingFighting = action.payload;
    },
    toggleLoadingGame: (state, action) => {
      state.isLoadingGame = action.payload;
    },
  },
});

export const {
  setAddress,
  setGameToken,
  setGameErr,
  setMonsters,
  setItems,
  setFightMonsters,
  setBattleInfo,
  addTotalCount,
  addWinCount,
  toggleLoadingFighting,
  toggleLoadingGame,
} = dataSlice.actions;

const formatItemsData = (data) => {
  return data
    .map((item) => {
      if (item.bpType === 1) {
        item.name = "Egg Frag.";
      } else if (item.bpType === 2) {
        item.name = "Potion";
      } else if (item.bpType === 5) {
        item.name = "uRACA";
      } else if (item.bpType === 6) {
        item.name = "Egg";
      }
      return item;
    })
    .filter((item) => item.name);
};

export const loginGame = (data) => async (dispatch, getState) => {
  try {
    const {
      auth: { token },
    } = getState((state) => state);

    dispatch(toggleLoadingGame(true));
    const url = "https://metamon-api.radiocaca.com/usm-api/login";
    const bodyFormData = createFormData(data);
    dispatch(setAddress(data.address));
    const res = await axios.post(url, bodyFormData);

    if (res.data.data) {
      dispatch(setGameToken(res.data.data));
      dispatch(toggleLoadingGame(false));
      const server = new Server(token);
      await server.insertAddress(data);
    } else {
      dispatch(setGameErr("Thông tin đăng nhập sai!"));
      dispatch(toggleLoadingGame(false));
    }
  } catch (err) {
    dispatch(setGameErr("Thông tin đăng nhập sai!"));
    dispatch(toggleLoadingGame(false));
    console.log(err);
  }
};

export const removeAddress = (addressId) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState((state) => state);

  const server = new Server(token);
  await server.removeAddress(addressId);
  dispatch(initUser(token));
};

export const getData = () => async (dispatch, getState) => {
  const {
    game: { gameToken, address },
  } = getState((state) => state);
  const api = new API(gameToken);

  const res = await Promise.all([
    api.sendRequest("getWalletPropertyList", { address }),
    api.sendRequest("checkBag", { address }),
  ]);

  dispatch(setMonsters(res[0].data.metamonList));
  dispatch(setItems(formatItemsData(res[1].data.item)));
};

const fight = (monster) => async (dispatch, getState) => {
  dispatch(toggleLoadingFighting(true));
  const {
    game: { gameToken, address },
  } = getState((state) => state);

  const server = new Server();
  const lastMonster = await server.getLastMonster();
  const monsterB = (lastMonster.id + 1).toString();
  const battleLevel = Math.ceil(monster.level / 20);
  const data = {
    address,
    monsterA: monster.id,
    monsterB,
    // monsterB: "1007830",
    // monsterB: "1003588",
    battleLevel,
  };
  const api = new API(gameToken);
  const battleInfo = await api.sendRequest("startBattle", data);

  dispatch(getData());
  if (battleInfo.code === "MONSTER_ERROR") {
    await server.insertMonster({
      id: monsterB,
      createTime: new Date(),
    });
  } else if (battleInfo.data) {
    const { challengedMonster, challengeResult } = battleInfo.data;
    dispatch(addTotalCount());
    if (challengeResult) {
      dispatch(addWinCount());
    }

    await server.insertMonster({
      con: challengedMonster.con,
      createTime: challengedMonster.createTime,
      crg: challengedMonster.crg,
      exp: challengedMonster.exp,
      id: challengedMonster.id * 1,
      imageUrl: challengedMonster.imageUrl,
      inte: challengedMonster.inte,
      inv: challengedMonster.inv,
      itemId: challengedMonster.itemId,
      itemNum: challengedMonster.itemNum,
      level: challengedMonster.level,
      life: challengedMonster.life,
      luk: challengedMonster.luk,
      monsterUpdate: challengedMonster.monsterUpdate,
      owner: challengedMonster.owner,
      race: challengedMonster.race,
      rarity: challengedMonster.rarity,
      sca: challengedMonster.sca,
      status: challengedMonster.status,
      tokenId: challengedMonster.tokenId,
      years: challengedMonster.years,
    });
    dispatch(setBattleInfo(battleInfo.data));
  }
  dispatch(toggleLoadingFighting(false));
};

export const updateMonster = (nftId) => async (dispatch, getState) => {
  dispatch(toggleLoadingFighting(true));
  const {
    game: { gameToken, address },
  } = getState((state) => state);

  const data = {
    address,
    nftId,
  };
  const api = new API(gameToken);
  await api.sendRequest("updateMonster", data);
  dispatch(getData());

  dispatch(toggleLoadingFighting(false));
};

export const startOneBattle = (monster) => async (dispatch) => {
  dispatch(fight(monster));
};

// export const startManyBattle = () => async (dispatch, getState) => {
//   const {
//     game: {
//       fightMonster: { tear },
//     },
//   } = getState((state) => state);
//   for (let i = 0; i < tear; i++) {
//     dispatch(fight());
//     await sleep(1000);
//   }
// };

export const selectIsLoadingFighting = (state) => state.game.isLoadingFighting;
export const selectIsLoadingGame = (state) => state.game.isLoadingGame;
export const selectMonsters = (state) => state.game.monsters;
export const selectBattleInfo = (state) => state.game.battleInfo;
export const selectItems = (state) => state.game.items;
export const selectWinRatio = createSelector(
  (state) => state.game.win,
  (state) => state.game.total,
  (win, total) => Math.round(total && (win / total) * 100)
);
export const selectGameToken = (state) => state.game.gameToken;
export const selectGameErr = (state) => state.game.gameErr;

export default dataSlice.reducer;
