import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

interface IKey {
  setSelf: Function;
  onSet: Function;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: IKey) => {
    const savedValue = localStorage.getItem(key);
    // console.log(savedValue);
    if (savedValue) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IToDoState, _: any, isReset: any) => {
      const confirm = newValue === undefined;
      confirm
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "KPT",
  default: {
    Keep: [],
    Problem: [],
    Try: [],
  },
  effects: [localStorageEffect("KPT")],
});
