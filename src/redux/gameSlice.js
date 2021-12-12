import { createSlice } from "@reduxjs/toolkit";

import server from "../model/Server";
import sleep from "../utils/sleep";

import API from "../model/API";

const initialState = {
  monsters: undefined,
  items: undefined,
  battleInfo: undefined,
  isLoadingGame: false,
};

export const dataSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setMonsters: (state, action) => {
      state.monsters = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setBattleInfo: (state, action) => {
      state.battleInfo = action.payload;
    },
    toggleLoadingGame: (state, action) => {
      state.isLoadingGame = action.payload;
    },
  },
});

export const {
  setMonsters,
  setItems,
  setFightMonsters,
  setBattleObj,
  setBattleInfo,
  toggleLoadingGame,
} = dataSlice.actions;

const formatItemsData = (data) => {
  return data.map((item) => {
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
  });
};

export const getData = () => async (dispatch, getState) => {
  const {
    auth: { token, address },
  } = getState((state) => state);
  const api = new API(token);

  const res = await Promise.all([
    api.sendRequest("getWalletPropertyList", { address }),
    api.sendRequest("checkBag", { address }),
  ]);

  dispatch(setMonsters(res[0].data.metamonList));
  dispatch(setItems(formatItemsData(res[1].data.item)));
};

const fight = (monster) => async (dispatch, getState) => {
  dispatch(toggleLoadingGame(true));
  const {
    auth: { token, address },
  } = getState((state) => state);

  const lastMonster = await server.getLastMonster();
  const monsterB = (lastMonster.id + 1).toString();
  const battleLevel = Math.ceil(monster.level / 20);
  const data = {
    address,
    monsterA: monster.id,
    monsterB,
    battleLevel,
  };
  const api = new API(token);
  const battleInfo = await api.sendRequest("startBattle", data);
  dispatch(getData());

  if (battleInfo.data) {
    const { challengedMonster } = battleInfo.data;
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
  dispatch(toggleLoadingGame(false));
};

export const startOneBattle = (monster) => async (dispatch) => {
  dispatch(fight(monster));
};

export const startManyBattle = () => async (dispatch, getState) => {
  const {
    game: {
      fightMonster: { tear },
    },
  } = getState((state) => state);
  for (let i = 0; i < tear; i++) {
    dispatch(fight());
    await sleep(1000);
  }
};

export const selectIsLoadingGame = (state) => state.game.isLoadingGame;
export const selectMonsters = (state) => state.game.monsters;
export const selectBattleInfo = (state) => state.game.battleInfo;
export const selectItems = (state) => state.game.items;

export default dataSlice.reducer;
