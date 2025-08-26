import { create, type StateCreator } from "zustand";
import type { TAppTheme } from "../types/additional";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

interface IActions {
  changeCover: () => void;
  changeModalStatus: () => void;
  changeTheme: () => void;
}

interface IInitialState {
  coverIsActive: boolean;
  modalIsOpen: boolean;
  appTheme: TAppTheme;
}

interface IAppStore extends IInitialState, IActions {}

const initialState: IInitialState = {
  coverIsActive: true,
  modalIsOpen: false,
  appTheme: "light",
};

const appStore: StateCreator<
  IAppStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  ...initialState,
  changeCover: () => set((state) => ({ coverIsActive: !state.coverIsActive }), false, "change cover"),
  changeModalStatus: () =>
    set((state) => ({ modalIsOpen: !state.modalIsOpen })),
  changeTheme: () => set(() => ({ appTheme: "dark" })),
});

export const useAppStore = create<IAppStore>()(
  devtools(
    persist(appStore, {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export const useCoverIsActive = () =>
  useAppStore((state) => state.coverIsActive);
export const useModalStatus = () => useAppStore((state) => state.modalIsOpen);
export const changeCover = () => useAppStore.getState().changeCover;
export const changeModalStatus = () => useAppStore.getState().changeModalStatus;
export const changeTheme = () => useAppStore.getState().changeTheme;
